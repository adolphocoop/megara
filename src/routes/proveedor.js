const express = require('express');
const router = express.Router();
const Proveedor = require('../model/Proveedor');

//Agregar proveedor
router.get('/prove/add', function (request, response){
    response.render('proveedores/new-prove')
    //response.send('Agregar cliente')

});


router.get('/proves', async function (request, response){
   //response.send('Proveedores en la base de datos')
   await Proveedor.find({}).lean().sort({fecha: 'desc'})
                  .then((proveedores)=>{
      console.log(proveedores);
      response.render('proveedores/consulta-prove',{proveedores})
   })
   .catch((err) =>{
      console.log(err);
      response.redirect('/error')
   })
});


router.post('/proveedores/new-prove', async function(request, response){
  const {nombre, email, telefono, ciudad } =request.body;
  const errores = [];
  if(!nombre){
     errores.push({text: 'Por favor ingresa el nombre'})
  }
  if(!email){
     errores.push({text: 'Ingrese su email'})
  }
  if(!telefono){
     errores.push({text: 'Ingresa el telefono'})
  }
  if(!ciudad){
    errores.push({text: 'Ingresa la ciudad'})
 }

  if(errores.length> 0){
     response.render('proveedores/new-prove',{
         errores,
         nombre,
         email,
         telefono, 
         ciudad
 
     });
  }else{ //No hay errores 
     const nuevoProveedor = new Proveedor({nombre, email, telefono, ciudad});
     await nuevoProveedor.save()
                         .then(()=>{
                           request.flash('success_msg', 'Proveedor agregado correctamente');
                           response.redirect('/proves');

                         })
                         .catch((err)=>{
                           console.log('/error')
                         })
     //console.log(nuevoProveedor);
     //response.send('OK')
  }
})

module.exports = router;
