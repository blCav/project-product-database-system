const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code : {
      type : String,
      required : true,
      unique : true,
    },

    descriptionProduct : {
        type : String
    },

    price : {
        type : Number
    },

}, {
    timestamps : true
});

module.exports = mongoose.model('itemProduct', productSchema);