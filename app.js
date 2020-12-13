const express = require ('express');

const middleware = require('./middleware')

const routes = require('./routes')

const {logger} = require('./configuration');

const createError = require('http-errors');

const app = express ();

process.on('unhandledRejection',(reason)=>{
    logger.error(reason);
    process.exit(1);
});

//middleware
middleware(app);

//routes
routes(app);

app.use((req,res,next)=>{
    const error = createError(404);
    next(error);
});

app.use((error , req ,res, next)=>{
    logger.error(error.message);
    
    res.statusCode = error.statusCode;
    res.json({
        message :error.message
    });
});
module.exports = app;