require('dotenv').config();
const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();
const {
    MY_APIKEY, MY_SECOND_APIKEY
  } = process.env;


router.get('/', async (req, res) => {
    let diets = await Diet.findAll();
    if(diets) res.status(200).json({ Contenido_de_Diets: diets });
    else res.status(200).send([])
});

module.exports = router;