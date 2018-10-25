const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/profile',(err)=>{ //enter ur api name
    if(err){
        console.log(err);
    }else {
        console.log("Database is connceted ");
    } 
});

module.exports.Profile = require('./profile');
module.exports.User=require('./users');

mongoose.Promise = Promise;