const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var schema = new Schema({
    email:({
        type:String
    }),
    password:({
        type:String
    })
})
const MyModel = mongoose.model('demo', schema);
module.exports = MyModel
