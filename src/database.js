const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/perfumes')
        .then( db => console.log("Base de datos conectada"))
        .catch( err => console.log(err));
        