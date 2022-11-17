const mongoose =require('mongoose');
const { Schema } = mongoose;


const ProveedoresSchema = new Schema ({
     nombre:{
        type: String,
        required: true
     },
     email:{
        type: String,
        required: true
     },
     telefono:{
        type: String,
        required: true
     },
     ciudad:{
        type:String,
        required: true

     },
     fecha:{
        type: Date,
        default: Date.now
     }
     
});

module.exports = mongoose.model('Proveedor', ProveedoresSchema);