const express = require('express');
const Productos = require('../model/Productos');
const router = express.Router();
const Producto = require('../model/Productos')

router.get('/products', async function(request, response){
    //response.send('Productos de la base de datos');

    await Productos.find({}).lean().sort({fecha: 'desc'})
                   .then((productos) =>{
                    //console.log(Producto)
                    response.render('productos/consulta-productos', {productos})


                  })
                  .catch((err)=>{
                    console.log(err);
                    response.redirect('/error')
                  })

});//Obtener los productos

router.get('/products/add', function(request, response){
    response.render('productos/crear-producto')

});
router.post('/productos/crear-producto', async function(request, response){
    //console.log(request.body);
    //response.send('OK')

const {proveedor, nombre, descripcion, tipo }= request.body;
const errores = [];
if(!proveedor){
    errores.push({text: 'Selecciona al proveedor'});
}
if(!nombre){
    errores.push({text: 'Ingresa nombre del producto'});
}
if(!descripcion){
    errores.push({text: 'Ingresa la descripcion por favor!'})
}
if(!tipo){
    errores.push({text: 'Ingresa el tipo por favor!'})
}
if (errores.length > 0){
    response.render('productos/crear-producto',{
        errores,
        proveedor,
        nombre,
        descripcion,
        tipo
    })
} else{
    const nuevoProducto = new Producto({proveedor, nombre, descripcion, tipo});
    await nuevoProducto.save()//await guarda en la base de datos de manera asincrona
                       .then(()=>{
                        request.flash('success_msg', 'Producto agregado de manera exitosa');
                        response.redirect('/products')//Redirigimos el flujo de la app a la lista de todas las notas
                       })
                       .catch((err)=>{
                        console.log(err);
                        response.redirect('/error');
                       })
                     
    
    
    console.log(nuevoProducto);
    //response.send('OK')
}

});
//Ruta para editar producto
router.get('/products/edit:id', async function(request, response){
    try{
        var _id = request.params.id;
        var len = request.params.id.length;

        _id = _id.substring(1, len);
        const producto = await Producto.findById(_id);
        _id = producto._id
        proveedor= producto.proveedor;
        nombre= producto.nombre;
        descripcion= producto.descripcion;
        tipo = producto.tipo
        response.render('productos/editar-producto',
                        {proveedor, nombre, descripcion, tipo, _id})
    } catch (error) {
        console.log(error);
        response.redirect('/error')

    }
});
router.put('/productos/editar-producto/:id', async function (request, response){
    const {proveedor, nombre, descripcion, tipo} = request.body;
    const _id = request.params.id
    const errores = [];
    if(!proveedor){
        errores.push({text: 'Por favor elige un Proveedor'})
    }
    if(!nombre){
        errores.push({text:'Por favor inserta el nombre'})
    }
    if(!descripcion){
        errores.push({text: 'Por favor inserta la descripcion'})
    }
    if(!tipo){
        errores.push({text: 'Por favor inserta el tipo'})
    }
    if(errores.length > 0 ){
        response.render('productos/editar-producto',{
            errores,
            proveedor,
            nombre,
            descripcion,
            tipo,
            _id
        })
    }else{
        await Producto.findByIdAndUpdate(_id,
            {proveedor, nombre, descripcion, tipo})
             .then(()=>{
                request.flash('success_msg', 'Producto actualizado de manera exitosa');
                response.redirect('/products');
             })
             .catch((error) =>{
                console.log(err);
                response.redirect('/error')
             })
    }//Else
});//Fin de guarda producto

//Ruta para eliminar
router.get('/products/delete:id', async function(request, response){
    try{
        var _id = request.params.id;
        var len = request.params.id.length;
        _id = _id.substring(1, len);
        

        const producto = await Producto.findByIdAndDelete(_id);
        request.flash('success_msg', 'Producto eliminado correctamente')
        response.redirect('/products');

    }catch (err){
        response.send(404);
    }
})


module.exports = router;
