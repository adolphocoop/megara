const express = require('express');
const app = express();
require('./database');
require('./config/passport');
const path = require('path');
const { engine } = require('express-handlebars');
const methodoverride = require('method-override');
const session = require ('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializaciones 


//Configuraciones
app.set('puerto', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
     defaultLayout:'main',
     defaultDir: path.join('views', 'layouts'),
     partialsDir: path.join(__dirname,'views', 'partials'),
     extname: 'hbs',
     runtimeOptions: {
      allowProtoPropertiesByDefault: true
     }




}))
app.set('view engine', 'hbs')

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(methodoverride('_method'));
app.use(session({
     secret: 'mysecretapp',
     resave: true,
     saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables Globales
app.use(function(request, response, next){
 response.locals.success_msg = request.flash('success_msg')
 response.locals.error_msg = request.flash('error_msg');
 response.locals.error= request.flash('error')
 response.locals.usuario =request.user || null;
 next();
})

//Rutas

app.use(require('./routes/index'));
app.use(require('./routes/products'));
app.use(require('./routes/proveedor'));
app.use(require('./routes/users'));
app.use(require('./routes/clientes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//Servidor
app.listen(app.get('puerto'), function(){
  console.log('Servidor corriendo en el puerto:' + app.get('puerto'));
});
app.use(methodoverride('_method'))

