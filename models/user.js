const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    birthDate: Date,
    phone: String,
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        default: "admin"
    }
}, { timestamps: true });
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);