const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema ({
    bName:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Book',itemsSchema,'book');