const express = require('express');
const router = express.Router();

router.get('/products', function(request, response){
    response.send('Productos de la base de datos');

});


module.exports = router;
