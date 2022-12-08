


const mongoose = require('mongoose');

const url = "mongodb+srv://perfumes:Perfumes.2022@cluster0.ayzdc8q.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)

        .then( ()=> {
                console.log('Conectado a la base de datos')
        })
        .catch((err)=>{
                console.log(err)
        });
        