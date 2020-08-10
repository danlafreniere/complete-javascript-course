// Global app controller.
import Search from './models/Search';
import * as searchView from './views/SearchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global state for application.
const state = {};

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
    await state.search.getResults();
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};
