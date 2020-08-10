import axios from 'axios';

// Global app controller.
async function getResults(query) {
  try {
    const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch(error) {
    console.log(error);
  }
}

getResults('pasta');
