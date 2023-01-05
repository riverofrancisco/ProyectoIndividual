const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Recipe, Diet } = require('../db');
const {
    MY_APIKEY, MY_APIKEY_2, MY_APIKEY_3, MY_APIKEY_4, MY_APIKEY_5, MY_APIKEY_6, API_PATH
  } = process.env;

  let diets = [];

 async function APIdiets(){
      const response = await fetch(`${API_PATH}/complexSearch?apiKey=${MY_APIKEY}&number=100&addRecipeInformation=true`);
      const data = await response.json();
      const apidiets = data.results.map(r => r.diets);
      apidiets.forEach(element => {
        element.forEach(e => diets.push(e))
      });
      const ExistingDiets = diets.filter((diet, index) => {
        return diets.indexOf(diet) === index;
      }
    );  
    
    return ExistingDiets.sort()/* .forEach((diet) => {return Diet.create({
      name: diet
    })});

    const DBdietsOBJ = await Diet.findAll({
      attributes: ['name']
    });

    const DBdietsARRAY = DBdietsOBJ.map((obj) => obj.name);
    return DBdietsARRAY */
};


/* async function AllDBdiets () {
    const APIdiets = await APIdiets();
        APIdiets.forEach((diet) => Diet.create({
      name: diet
    }));

    const DBdietsOBJ = await Diet.findAll({
      attributes: ['name']
    });

    DBdietsOBJ.map((obj) => obj.name) 
    return APIdiets;
} */

module.exports = {
  APIdiets
}