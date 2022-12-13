const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();
const {
    MY_APIKEY, MY_APIKEY_2, API_PATH
  } = process.env;

//POST
router.post('/', async (req, res) => {
    const {title, summary, diet} = req.body;

    try{
      if(!title || !summary) return res.status(404).send('Falta enviar datos obligatorios');
      const reci = await Recipe.create(req.body);
      if(diet) await Diet.create({name: diet});
      res.status(200).send(reci);
    } catch(err){
      res.status(404).json({
        Tipo: 'Ha ocurrido un error',
        error: err
      });
    }
})

//GET
router.get('/', async (req, res) => {
    const {name} = req.query;
    let recipes = [];
    try {
        const response = await fetch(`${API_PATH}/complexSearch?apiKey=${MY_APIKEY}&number=100&addRecipeInformation=true`);
        const data = await response.json();
        let shortAPIRecipes = data.results.map(r => {return {
            id: r.id,
            title: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            image: r.image
        }});
        let shortDBRecipes = await Recipe.findAll({
            attributes: ['id', 'title', 'summary', 'healthScore', 'image']
        })

        if (!name) {
            recipes = await recipes.concat(shortDBRecipes);
            recipes = await recipes.concat(shortAPIRecipes);
            res.status(200).json(recipes.slice(0,100));
        } else {
            recipes = recipes.concat(shortDBRecipes).concat(shortAPIRecipes).filter(e => e.title.toLowerCase().includes(name.toLowerCase()))
            if(recipes.length === 0) {
                res.send(`No se encontraron recetas que contengan "${name}"`);
                } else {
                res.status(200).send(recipes)};
        }
        
    } catch (err) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            err: err});
    }
  })
  

router.get('/:idReceta', async (req, res) => {
    const {idReceta} = req.params;

    try {
        if(typeof parseInt(idReceta) === 'number') {
            const response = await fetch(`${API_PATH}/${idReceta}/information?apiKey=${MY_APIKEY}`);
            const data = await response.json();
                res.status(200).json({
                    id: data.id,
                    title: data.title,
                    summary: data.summary,
                    healthScore: data.healthScore,
                    stepBYstep: data.analyzedInstructions[0].steps.map(e => e.number  + ': ' + e.step),
                    diets: data.diets,
                    image: data.image
                });
        } else {
            res.status(200).json({
                id: idReceta,
                title: 'Se encuentra en la base de datos'
                });
        }
    } catch (err) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            error: err});
    }
})


module.exports = router;