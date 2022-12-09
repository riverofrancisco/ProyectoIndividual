require('dotenv').config();
const { Router } = require('express');
const Diet = require('../models/Diet');
const router = Router();
const {
    MY_APIKEY, MY_SECOND_APIKEY
  } = process.env;


router.get('/', (req, res) => {
    
    res.status(200).send('Contenido de /diet')
});

module.exports = router;