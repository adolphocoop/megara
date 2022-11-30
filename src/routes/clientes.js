const { response } = require('express');
const express = require('express');
const router = express.Router();
const Cliente = require('../model/Clientes');
const { isAuthenticated } = require('../helpers/auth');

router.get('/cliente/add',isAuthenticated, function (request, response){
    response.render('clientes/nuevo-cliente')
    //response.send('Agregar cliente')

});
//obtener clientes
router.get('/clientes',isAuthenticated, async function(request, response){
    //response.send("Clientes de la base de datos")
    await Cliente.find({}).lean().sort({fecha: 'desc'})
                .then((clientes) =>{
                //console.log(clientes)
                response.render('clientes/consulta-clientes',{clientes} )
                })

                .catch((err) =>{
                    console.log(err);
                    response.redirect('/error')
                })

})//Metodo para obtener clientes




router.post('/clientes/nuevo-cliente',isAuthenticated, async function(request, response){
   // console.log(request.body);
    //response.send("OK")
 const {nombre, apellidos, email, telefono} =request.body;
 const errores = [];
 if(!nombre){
    errores.push({text: 'Por favor ingresa el nombre'})
 }
 if(!apellidos){
    errores.push({text: 'Ingresa tus apellidos'})
 }
 if(!email){
    errores.push({text: 'Ingrese su email'})
 }
 if(!telefono){
    errores.push({text: 'Ingresa el telefono'})
 }
 if(errores.length> 0){
    response.render('clientes/nuevo-cliente',{
        errores,
        nombre,
        apellidos,
        email,
        telefono

    });
 }else{ //No hay errores 
    const nuevoCliente = new Cliente({nombre, apellidos, email, telefono});
    await nuevoCliente.save()
                      .then(()=> { //Se guarda el cliente correctamente
                        request.flash('success_msg', 'Cliente agregado correctamente');
                        response.redirect('/clientes')
                    })
                       
                    
                       .catch((err)=>{
                        console.log(err)
                        response.redirect('/error')
                       })
    console.log(request.body)
    //response.send('OK')

 }
 
});
//Editar clientes

router.get('/clientes/edit:id',isAuthenticated, async function(request, response){

    try{
        var _id = request.params.id;
        var len = request.params.id.length;

        _id = _id.substring(1, len);
        const cliente = await Cliente.findById(_id);
        _id = cliente.id
        nombre= cliente.nombre;
        apellidos= cliente.apellidos;
        email= cliente.email;
        telefono = cliente.telefono
        response.render('clientes/editar-cliente',
                        {nombre, apellidos, email, telefono, _id})
    } catch (error) {
        console.log(error);
        response.redirect('/error')

    }

})//Fin de ruta editar

//Ruta para guardar cliente editado
router.put('/clientes/editar-cliente/:id',isAuthenticated, async function(request, response){
   const {nombre, apellidos, email, telefono } = request.body;
   const _id = request.params.id
   const errores = [];
   if(!nombre){
     errores.push({text: 'Por favor inserta el nombre'})
   }
   if(!apellidos){
    errores.push({text: 'Por favor inserta los apellidos'})
  }
  if(!email){
    errores.push({text: 'Por favor inserta el correo'})
  }
  if(!telefono){
    errores.push({text: 'Por favor inserta el telefono'})
  }
  if(errores.length > 0){
    response.render('clientes/edit-cliente',{
        errores,
        nombre,
        apellidos,
        email,
        telefono
    });
  }else{
    await Cliente.findByIdAndUpdate(_id,
                 {nombre, apellidos, email, telefono})
                 .then(()=>{
                    request.flash('success_msg', 'Cliente actualizado correctamente');
                    response.redirect('/clientes');
                 })
                 .catch((err)=>{
                    console.log(err);
                    response.redirect('/error')
                 })
                }
});
//Ruta para eliminar clientes

router.get('/clientes/delete:id',isAuthenticated, async function(request, response){
   try{
      var _id = request.params.id;
      var len = request.params.id.length;
      _id = _id.substring(1, len);

      const cliente = await Cliente.findByIdAndDelete(_id);
      request.flash('success_msg', 'Cliente ha sido eliminado correctamente')
      response.redirect('/clientes');

   } catch (err){
      response.send(404);
   }
});







module.exports = router;
