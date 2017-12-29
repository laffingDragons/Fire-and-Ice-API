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
//include the model file

var Book = require('./bookModel.js');

var bookModel = mongoose.model('Book');
//ends include

//here are the routes
app.get('/', function (req, res) {
    res.send('This is a GOT Application')
});

////// lets write code here for the routes//////

//start route to GEt allbooks
app.get('/books', function (req, res) {

    bookModel.find(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }); // end user model find
});

//to get single blog
app.get('/books/:id', function (req, res) {
    bookModel.findOne({
        '_id': req.params.id
    }, function (err, result) {
        if (err) {
            console.log("some Error");
            res.send(err);
        } else {
            res.send(result);
        }
    }); //end user model find
}); // end route to get a particular blog

//to create a blog
app.post('/book/create', function (req, res) {
    var newBlog = new bookModel({
        name: req.body.name,
        isbn: req.body.isbn,
        publisher: req.body.publisher,
        country: req.body.country
    }); //end newBlog

    //lets set the date of creation
    var today = new Date();
    newBook.released  = today;

    //lets set the tags into array
    var author = req.body.author.split(',') : '';
    newBook.author = author;

    // now lets save the file
    newBlog.save(function (error) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            res.send(error);
        }
    }); //end new blog save

}); // 

//start route to edit a blog using _id

app.put('/books/:id/edit', function(req, res) {

    var update = req.body;

    bookModel.findOneAndUpdate({'_id': req.params.id}, update, function (err, result) {

        if (err) {
            console.log("some Error");
            res.send(err);
        } else {
            res.send(result);
        }
    }); //end user model find
});

//start the route to delete a blog
app.post('/books/:id/delete',function(req, res){
    
    bookModel.remove({'_id':req.params.id},function(err, result){
        if(err){
           console.log("some Error");
           res.send(err);
       }
       else{
           res.send(result);
       }
    });//end user model find
});

//
app.listen(3000, function(){
    console.log('Listening on Port 3000');
});