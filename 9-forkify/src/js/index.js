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
    renderLoader(elements.recipeContainer);
    state.recipe = new Recipe(id);
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      recipeView.clearRecipe();
      recipeView.renderRecipe(state.recipe);
    } catch(error) {
      console.log(error);
    }
  }
};

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
