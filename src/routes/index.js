const express = require('express');
const router = express.Router();


router.get('/', function(request, response){
    response.render('index');
});

router.get('/about', function(request, response){
    response.render('about')
})



module.exports =router;
