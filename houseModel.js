var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var houseSchema = new Schema({

    name         : {type: String,default: ''},
    region       : {type: String,default: ''},
    coatOfArms   : {type: String,default: ''},
    titles       : [],
    currentLord  : {type: String,default: ''},
    founded      : {type: Date},
    founder      : {type: String,default: ''},
    swornMembers : []
  
},{timestamps:true});

mongoose.model('House',houseSchema);
