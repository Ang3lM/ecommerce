const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Boom = require('@hapi/boom');
const cors = require('cors');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middlewares/errorsHandlers');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
const {config} = require('./config');

// app
const app = express();

// connect to DB
const mongo = require('./lib/mongo.js');

// Settings
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");

// middlewares
if(!config.dev){
    app.use(cors());
}
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));

// static files
app.use("/static",express.static(path.join(__dirname,"public")));


// redirect
app.get('/',function(req,res){
    res.redirect('/products');
});

// routes
app.use("/products",productsRouter);
app.use("/api/products", productsApiRouter);
app.use("/api/auth",authApiRouter);

app.use(function(req,res,nex){
    if(isRequestAjaxOrApi(req)){
        const {
            output: {statusCode, payload}
        }=Boom.notFound();
        res.status(statusCode).json(payload);
    }
    res.status(404).render("404");
})

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// server
app.listen(app.get('port'), function(){
    console.log(`Listening http://localhost`);
});

module.exports = app;