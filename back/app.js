var express = require('express');
var app = express();
const myApp = require('./config/express');







//initilization of express
myApp(app);








module.exports = app;
