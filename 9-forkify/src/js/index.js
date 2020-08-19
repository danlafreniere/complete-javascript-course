// Global app controller.
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
      recipeView.renderRecipe(state.recipe);
    } catch(error) {
      console.log(error);
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipeContainer.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  }
  console.log(state.recipe);
});
