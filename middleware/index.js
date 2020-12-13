
const morgan = require('morgan');
const {logger} = require('../configuration');
const express = require('express');

//morgan is http request looger,its just log all the request entry on console.
module.exports = (app)=>{
    app.use(morgan('combine', {stream:logger.stream}));
    app.use(express.json());
};