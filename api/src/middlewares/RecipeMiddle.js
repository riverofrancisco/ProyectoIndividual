const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Recipe, Diet } = require('../db');
const {
    MY_APIKEY, MY_APIKEY_2, MY_APIKEY_3, MY_APIKEY_4, MY_APIKEY_5, API_PATH
  } = process.env;

let recipes = [];

async function APIrecipes(){
    const response = await fetch(`${API_PATH}/complexSearch?apiKey=${MY_APIKEY_5}&number=100&addRecipeInformation=true`);
    const data = await response.json();
    const shortAPIRecipes = data.results.map(r => {return {
        id: 'api' + r.id,
        title: r.title,
        summary: r.summary,
        healthScore: r.healthScore,
        image: r.image,
        diets: r.diets
    }});
    return shortAPIRecipes
};

async function DBrecipes(){
    const shortDBRecipes = await Recipe.findAll({
        attributes: ['id', 'title', 'summary', 'healthScore', 'image'],
        include: {
            model: Diet,
            attributes: ['name']
        },
    })//continuar revisando lo que recibo.
    return shortDBRecipes;
};

async function Allrecipes(){
    const AllRecipes = recipes.concat(await DBrecipes()).concat(await APIrecipes());
    return AllRecipes;
};

async function OneRecipebyId(idReceta){
const recipes = await Allrecipes();
const THErecipe = recipes.filter(r => r.id.toString() === idReceta)
if(THErecipe.length > 0){
     if(idReceta[0] === 'a'){ 
        let ID = idReceta.slice(3);
        const response = await fetch(`${API_PATH}/${ID}/information?apiKey=${MY_APIKEY_5}`);
        const data = await response.json();
        const APIoneRecipe = {
                        id: 'api' + data.id,
                        title: data.title,
                        summary: data.summary,
                        healthScore: data.healthScore,
                        stepBYstep: data.analyzedInstructions[0].steps.map(e => /* e.number  + ': ' + */ e.step),
                        diets: data.diets,
                        image: data.image
                    };
        return APIoneRecipe;
     } else {
        const DBoneRecipe = await Recipe.findOne({
            where: { id: idReceta },
            include: {
                model: Diet,
                attributes: ['name']
            },
        })
/*         const datadiets = DBoneRecipe.diets.forEach(element => {return element.name});
        DBoneRecipe.diets = datadiets; */
        return DBoneRecipe;
    }
} else {
    return null
}
};





module.exports = {
    Allrecipes,
    OneRecipebyId
}