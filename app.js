var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//calling mongoose module
var mongoose = require('mongoose');

app.use(bodyParser.json({limit: '10mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb',extended: true}));

var dbPath = "mongodb://localhost/mygotapp";
//command to connect with database
db = mongoose.connect(dbPath);

mongoose.connection.once('open', function () {
    
    console.log("Database Connection open successfully... GOT app is Running...");
});
