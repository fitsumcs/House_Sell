const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HouseModel = require('./models/house');
const UserModel = require('./models/user');
const passport = require('passport');
const passportLocal = require('passport-local');
//routes
const houseRoute = require('./routes/houseRoute');
const authRoute = require('./routes/authRoute');

// port 
const port = process.env.PORT || 3000;
// db url 
const database_url = process.env.DB_URL || 'mongodb://localhost/house_db';

//connection
mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true });



// The app 
const app = express();


// config 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));


// Passport config 
app.use(require('express-session')({
    secret: "here we go agin",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
//current user 
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
//routes 
app.get("/", (req, res) => {
    res.render('index');
});

app.use('/houses', houseRoute);
app.use(authRoute);

app.listen(port, () => console.log("Server Started"));