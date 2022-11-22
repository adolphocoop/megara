const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const passport = require('passport');
const Usuario = require('../model/Usuario')

router.get('/users/singin', function(request, response){
    //response.send('Formulario de autenticacion');
    response.render('users/singin')

});

router.post('/users/singin',passport.authenticate('local',{
    //si todo sale bien lo direccionamos
    successRedirect: '/products',
    //Si hay algun error lo dirreccionamos
    failureRedirect: '/users/singin',
    failureFlash: true

}))
router.get('/users/singup', function(request, response){
    //response.send('Formulario de autenticacion');
    response.render('users/singup')

});

//Ruta para recir los datos del formulario
router.post('/users/singup', async function(request, response){
    const {nombre, email, password, confirmarpassword } = request.body;
    const errores =[];
    if(!nombre){
        errores.push({text: 'Por favor ingrese el nombre'})
    }
    if(!email){
        errores.push({text:'Por favor ingrese el correo'})
    }
    if(!password){
        errores.push({text: 'Por favor ingrese el password'})
    }
    if(password.length < 4){
        errores.push({text: 'El password debe tener al menos 4 caracteres'})
    }
    if(password != confirmarpassword){
        errores.push({text: 'El password no coicide'})
    }
    if(errores.length > 0){
        response.render('users/singup',{
            errores,
            nombre,
            email,
            password,
            confirmarpassword
        })
    }else{
        const emailUser = await Usuario.findOne({email: email});
        if(emailUser){
            errores.push({text: 'El email ya esta en uso, por favor eliga uno nuevo'})
            response.render('users/singup',{
                errores,
                nombre,
                email,
                password,
                confirmarpassword
            });
            return;
        }

        //response.send('OK')
        const newUser = new Usuario({
            nombre,
            email,
            password
        })
        newUser.password = await newUser.encryptPassword (password);
        //console.log(newUser);
        await newUser.save()
                     .then(()=>{
                        request.flash('success_msg', 'Usuario registrado de manera exitosa');
                        response.redirect('/users/singup')
                        console.log(newUser)
                     })
                     .catch( (err) =>{
                        console.log(err);
                        response.redirect('/error');
                     })
        
    }

});
router.get('/users/logout', function(request, response){
    request.session.destroy(function (err){
        if(err){
            return next(err);
        }

        //Destruir los datos de la sesion
        request.session = null;

        //Hacer un redirect a la pagina principal
        response.redirect('/');
    });
});





module.exports = router;
