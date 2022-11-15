const express = require('express');
const router = express.Router();
const proveedor = require('../model/Proovedor');

//Agregar proveedor
router.get('/prove/add', function (request, response){
    response.render('proveedores/nuevo-proveedor')
    //response.send('Agregar cliente')

});

module.exports = router;
