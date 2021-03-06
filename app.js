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


//include the model for books file

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


//route for books have less than 100 pages
app.get('/book/less', function (req, res) {

    bookModel.find().where('numberOfPages').lte(100).exec(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }); // end user model find
});

//route for books have greater than 100 pages
app.get('/book/big', function (req, res) {

    bookModel.find().where('numberOfPages').gt(100).exec(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }); // end user model find
});

//route for books in india
app.get('/book/local', function (req, res) {

    bookModel.find().where('country', 'India').exec(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }); // end user model find
});


//to create a book
app.post('/book/create', function (req, res) {
    var newBook = new bookModel({
        name: req.body.name,
        isbn: req.body.isbn,
        country: req.body.country,
        numberOfPages: req.body.numberOfPages,
        publishers: req.body.publishers,
        released : req.body.released
    }); //end newBook

    //lets set the date of creation
    var today = Date();
    newBook.created  = today;

    //lets set the tags into array
    var author = (req.body.author != undefined && req.body.author != null) ? req.body.author.split(',') : '';
    newBook.author = author;

    // now lets save the file
    newBook.save(function (error) {
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

//include the model for characs file

var Charac = require('./characModel.js');

var characModel = mongoose.model('Charac');
//ends include

/*//here are the routes
app.get('/', function (req, res) {
    res.send('This is a GOT Application')
});*/

////// lets write code here for the routes//////

//start route to GEt allcharacs
app.get('/characs', function (req, res) {

    characModel.find(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }); // end user model find
});

//to get single blog
app.get('/characs/:id', function (req, res) {
    characModel.findOne({
        '_id': req.params.id
    }, function (err, result) {
        if (err) {
            console.log("some Error");
            res.send(err);
        } else {
            res.send(result);
        }
    }); //end user model find
}); // end route to get a particular charac


//to create a charac
app.post('/charac/create', function (req, res) {
    var newCharac = new characModel({
        name: req.body.name,
        culture: req.body.culture,
        father: req.body.father,
        mother: req.body.mother,
        born : req.body.born,
        died : req.body.died
    }); //end newBook

    //lets set the date of creation
    /*var today = Date();
    newBook.created  = today;
*/
    //lets set the tags into array
    var titles = (req.body.titles != undefined && req.body.titles != null) ? req.body.titles.split(',') : '';
    newCharac.titles = titles;

    var aliases = (req.body.aliases != undefined && req.body.aliases != null) ? req.body.aliases.split(',') : '';
    newCharac.aliases = aliases;

    var tvSeries = (req.body.tvSeries != undefined && req.body.tvSeries != null) ? req.body.tvSeries.split(',') : '';
    newCharac.tvSeries = tvSeries;

    // now lets save the file
    newCharac.save(function (error) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            res.send(error);
        }
    }); //end new blog save

}); // 

//start route to edit a blog using _id

app.put('/characs/:id/edit', function(req, res) {

    var update = req.body;

    characModel.findOneAndUpdate({'_id': req.params.id}, update, function (err, result) {

        if (err) {
            console.log("some Error");
            res.send(err);
        } else {
            res.send(result);
        }
    }); //end user model find
});

//start the route to delete a blog
app.post('/characs/:id/delete',function(req, res){
    
    characModel.remove({'_id':req.params.id},function(err, result){
        if(err){
           console.log("some Error");
           res.send(err);
       }
       else{
           res.send(result);
       }
    });//end user model find
});


//include the model for house file

var House = require('./houseModel.js');

var houseModel = mongoose.model('House');
//start route to GEt allhouse
app.get('/house', function (req, res) {

    houseModel.find(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    }); // end user model find
});

//to get single house
app.get('/house/:id', function (req, res) {
    houseModel.findOne({
        '_id': req.params.id
    }, function (err, result) {
        if (err) {
            console.log("some Error");
            res.send(err);
        } else {
            res.send(result);
        }
    }); //end user model find
}); // end route to get a particular house


//to create a house
app.post('/house/create', function (req, res) {
    var newHouse = new houseModel({
        name: req.body.name,
        region: req.body.region,
        coatOfArms: req.body.coatOfArms,
        currentLord: req.body.currentLord,
        founder : req.body.founder
    }); //end newBook

    //lets set the date of creation
    var today = Date();
    newHouse.founder  = today;

    //lets set the tags into array
    var titles = (req.body.titles != undefined && req.body.titles != null) ? req.body.titles.split(',') : '';
    newHouse.titles = titles;

    var swornMembers = (req.body.swornMembers != undefined && req.body.swornMembers != null) ? req.body.swornMembers.split(',') : '';
    newHouse.swornMembers = swornMembers;

    // now lets save the file
    newHouse.save(function (error) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            res.send(error);
        }
    }); //end new blog save

}); // 

//start route to edit a blog using _id

app.put('/house/:id/edit', function(req, res) {

    var update = req.body;

    houseModel.findOneAndUpdate({'_id': req.params.id}, update, function (err, result) {

        if (err) {
            console.log("some Error");
            res.send(err);
        } else {
            res.send(result);
        }
    }); //end user model find
});

//start the route to delete a blog
app.post('/house/:id/delete',function(req, res){
    
    houseModel.remove({'_id':req.params.id},function(err, result){
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