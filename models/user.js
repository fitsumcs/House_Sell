const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);