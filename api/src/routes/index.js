require('dotenv').config();
const { Router } = require('express');
/* const { Recipe, Diet } = require('../models'); */
const { default: axios } = require('axios');
const {
  MY_APIKEY, MY_SECOND_APIKEY
} = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./recipes')
const dietsRouter = require('./diets')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter)

/* router.get('/diet', (req, res) => {
    
    res.status(200).send('Contenido de /diet')
});

router.get('/recipes', (req, res) => {
  const {name} = req.query;
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_APIKEY}`)
      .then(r => r.json())
      .then(data => res.status(200).json(data))

     res.status(200).json({
        a: `Obtener un listado de las recetas que contengan la palabra ingresada como query parameter`,
        b: 'Si no existe ninguna receta mostrar un mensaje adecuado'}) 
})

router.get('/recipes/:idReceta', (req, res) => {
    const {idReceta} = req.params;
    fetch(`https://api.spoonacular.com/recipes/${idReceta}/information`)
    .then(response => response.json())
    .then(data => res.status(200).json(data))

    res.status(200).json({
        a: `Obtener el detalle de una receta en particular. La ${idReceta}`,
        b: 'Debe traer solo los datos pedidos en la ruta de detalle de receta',              
        c: `Incluir los tipos de dieta asociados a receta  ${idReceta}`})
})

router.post('/recipes', async (req, res) => {
    const {name, resume} = req.body;

    try{
      if(!name || !resume) return res.status(404).send('Falta enviar datos obligatorios');
      const recipe = await Recipe.create(req.body);
      res.status(200).json(recipe);
    } catch(e){
      res.status(404).json({error: e});
    }
})
 */
 

module.exports = router;
