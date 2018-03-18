var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    password: String,
    email: String
});