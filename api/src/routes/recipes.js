const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();
const {
    MY_APIKEY, MY_APIKEY_2, API_PATH
  } = process.env;

router.post('/', async (req, res) => {
    const {title, summary} = req.body;

    try{
      if(!title || !summary) return res.status(404).send('Falta enviar datos obligatorios');
      const reci = await Recipe.create(req.body);
      res.status(200).send(reci);
    } catch(err){
      res.status(404).json({
        Tipo: 'Ha ocurrido un error',
        error: err
      });
    }
})

router.get('/', async (req, res) => {
    const {name} = req.query;
    let recipes = [];
    try {
        const response = await fetch(`${API_PATH}/complexSearch?apiKey=${MY_APIKEY}`);
        const data = await response.json();
        if (!name) {
            recipes = recipes.concat(data.results.slice(0,100))
            res.status(200).json(recipes);
        } else {
            recipes = recipes.concat(data.results.slice(0,100)).filter(e => e.title.toLowerCase().includes(name.toLowerCase()))
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
                diets: data.diets
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