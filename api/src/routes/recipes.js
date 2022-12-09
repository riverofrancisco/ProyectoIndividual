const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();
const { Router } = require('express');
const Recipe = require('../models/Recipe');
const router = Router();
const {
    MY_APIKEY, MY_SECOND_APIKEY
  } = process.env;

router.post('/', async (req, res) => {
    const {name, resume} = req.body;

    try{
      if(!name || !resume) return res.status(404).send('Falta enviar datos obligatorios');
      const recipe = await Recipe.create(req.body);
      res.status(200).json(recipe);
    } catch(err){
      res.status(404).json({error: err});
    }
})

router.get('/', async (req, res) => {
    const {name} = req.query;
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_APIKEY}`);
        const json = await response.json();
        res.status(200).send(json.results.slice(0,3));
    } catch (err) {
        res.status(400).json({
            Tipo: 'Ha ocurrido un error',
            err: err});
    }
    
/*     try{
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_APIKEY}`)
        .then(response => res.status(200).json(response.json()))
    }catch(e){
            res.status(400).json({error: e});
        } */
      /* res.status(200).json({
          a: `Obtener un listado de las recetas que contengan la palabra ingresada como query parameter`,
          b: 'Si no existe ninguna receta mostrar un mensaje adecuado'}) */
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