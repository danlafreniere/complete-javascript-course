import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
}

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.searchResultPages.innerHTML = '';
}

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => {
  return `
    <button class="btn-inline results__btn--${ type }" data-goto=${ type === 'prev' ? page - 1 : page + 1 }>
      <span>Page ${ type === 'prev' ? page - 1 : page + 1 }</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
    </button>
  `;
}

const renderButtons = (page, numResults, resultsPerPage) => {
  const pages = Math.ceil(numResults / resultsPerPage);
  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${ createButton(page, 'prev') }
      ${ createButton(page, 'next') }
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }
  elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  const start = (page - 1) * resultsPerPage;
  const end = resultsPerPage * page;
  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resultsPerPage);
}
