var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({

   name           : {type: String,default: '',required: true},
   isbn           : {type: Number,default: '',required: true},
   author         : [],
   numberOfPages  : {type: Number,default: ''},
   publisher      : {type: String,default: ''},
   country        : {type: String,default: ''},
   released       : {type:Date}
  
});

mongoose.model('Book',bookSchema);
