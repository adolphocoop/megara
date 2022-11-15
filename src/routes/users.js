const express = require('express');
const router = express.Router();

router.get('/users/singin', function(request, response){
    response.send('Ingresando a la app');

});
router.get('/users/singup', function(request, response){
    response.send('Formulario de autenticacion');

});
module.exports = router;
