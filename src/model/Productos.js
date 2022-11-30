const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductosSchema = new Schema ({
    proveedor:{
        type: String,
        required: true
     },
     nombre:{
        type: String,
        required: true
     },
     descripcion:{
        type: String,
        required: true
     },
     tipo:{
        type: String,
        required: true
     },
     precio:{
      type: String,
      required: true
     },
     fecha:{
        type: Date,
        default: Date.now
     }
    
})

module.exports =mongoose.model('Producto', ProductosSchema);
