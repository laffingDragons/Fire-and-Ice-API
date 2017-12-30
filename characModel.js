var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characSchema = new Schema({

    name    : {type: String,default: ''} ,
    culture : {type: String,default: ''},
    born    : {type: Date} ,
    died    : {type: Date} ,
    titles  : [],
    aliases : [],
    father  : {type: String,default: ''},
    mother  : {type: String,default: ''},
    tvSeries: [],
    playedBy: {type: String,default: ''}
  
},{timestamps:true});

mongoose.model('Charac',characSchema);
