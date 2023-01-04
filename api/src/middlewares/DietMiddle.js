const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Recipe, Diet } = require('../db');
const {
    MY_APIKEY, MY_APIKEY_2, MY_APIKEY_3, MY_APIKEY_4, MY_APIKEY_5, API_PATH
  } = process.env;

  let diets = [];

async function getDiets(){
  diets = await Diet.findAll();
  if(diets.length){ 
      return diets;
  } else {
      const response = await fetch(`${API_PATH}/complexSearch?apiKey=${MY_APIKEY_5}&number=100&addRecipeInformation=true`);
      const data = await response.json();
      const apidiets = data.results.map(r => r.diets);
      apidiets.forEach(element => {
        element.forEach(e => diets.push(e))
      });
      const ExistingDiets = diets.filter((diet, index) => {
        return diets.indexOf(diet) === index;
      }
    );
      return ExistingDiets.sort();
  }
 } 

module.exports = {
  getDiets
}