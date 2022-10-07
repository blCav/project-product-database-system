const mongoose = require('mongoose');
passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({

    name : {
        
        type : String,
        trim : true,
        required: true
    },

    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    }},
    
    { 
        timestamps : true
    
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"})

module.exports = mongoose.model('User', userSchema);