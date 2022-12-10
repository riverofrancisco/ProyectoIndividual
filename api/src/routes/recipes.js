const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const e = require('express');
const { Router } = require('express');
const Recipe = require('../models/Recipe');
const router = Router();
const {
    MY_APIKEY, MY_SECOND_APIKEY
  } = process.env;

router.post('/', async (req, res) => {
    const {title, summary} = req.body;

    try{
      if(!title || !summary) return res.status(404).send('Falta enviar datos obligatorios');
      const reci = await Recipe.create(req.body);
      res.status(200).send(reci);
    } catch(err){
      res.status(404).json({error: err});
    }
})

router.get('/', async (req, res) => {
    const {name} = req.query;
    let recipes = [];
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_APIKEY}`);
        const data = await response.json();
        if (!name) {
            recipes = recipes.concat(data.results.slice(0,100))
            res.status(200).json(recipes);
        } else {
            recipes = recipes.concat(data.results.slice(0,100)).filter(e => e.title.toLowerCase().includes(name.toLowerCase()))
            res.status(200).send(recipes);
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
        const response = await fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${MY_APIKEY}`);
        const json = await response.json();
        res.status(200).send(json);
    } catch (err) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            err: err});
    }

/*     res.status(200).json({
        a: `Obtener el detalle de una receta en particular. La ${idReceta}`,
        b: 'Debe traer solo los datos pedidos en la ruta de detalle de receta',              
        c: `Incluir los tipos de dieta asociados a receta  ${idReceta}`}) */
})


module.exports = router;