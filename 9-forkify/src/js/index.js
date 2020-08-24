// Global app controller.
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global state for application.
const state = {};

/**
 * SEARCH CONTROLLER
 */
elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener('click', event => {
  const button = event.target.closest('.btn-inline');
  if (button) {
    const goToPage = button.dataset.goto;
    searchView.clearResults();
    searchView.renderResults(state.search.result, parseInt(goToPage));
  }
});

const controlSearch = async () => {
  // Get query from view.
  const query = searchView.getInput();
  if (query) {
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);
    state.search = new Search(query);
    try {
      await state.search.getResults();
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch(error) {
      console.log(error);
      clearLoader();
    }
  }
};

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  if (id) {
    recipeView.clearRecipe();
    renderLoader(elements.recipeContainer);
    if (state.search) searchView.highlightSelected(id);
    state.recipe = new Recipe(id);
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      recipeView.renderRecipe(
        state.recipe,
        state.likes.isLiked(id)
      );
      clearLoader();
    } catch(error) {
      console.log(error);
    }
  }
};

/**
 * LIST CONTROLLER
 */
const controlList = () => {
  if (!state.list) state.list = new List();
  state.recipe.ingredients.forEach(item => {
    const ingredient = state.list.addItem(item.count, item.unit, item.ingredient);
    listView.renderItem(ingredient);
  });
}

elements.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

/**
 * LIKES CONTROLLER
 */
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  if (!state.likes.isLiked(currentID)) {
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img,
    );
    likesView.toggleLikeBtn(true);
    likesView.renderLike(newLike);
  } else {
    state.likes.deleteLike(currentID);
    likesView.toggleLikeBtn(false);
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener('load', () => {
  state.likes = new Likes();
  state.likes.readStorage();
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  state.likes.likes.forEach(like => likesView.renderLike(like));
});

elements.recipeContainer.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  } else if (event.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
