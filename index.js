const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HouseModel = require('./models/house');
const UserModel = require('./models/user');
const passport = require('passport');
const passportLocal = require('passport-local');

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
app.get('/houses', (req, res) => {
    HouseModel.find({}, (error, homes) => {
        if (error) {
            console.log("Some DB error");
        } else {
            res.render('home', { homes });
        }
    });

});
// new house form view
app.get('/houses/new', (req, res) => {
    res.render('newHouse');
});
// view single house form view
app.get('/houses/:id', (req, res) => {
    HouseModel.findById(req.params.id, (error, home) => {
        if (error) {
            console.log("Some Error");

        } else {
            res.render('houseDetail', { home });
        }

    });

});
// add new house 
app.post('/houses', (req, res) => {

    //grab data from form 
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const city = req.body.city;
    const location = req.body.location;
    const data = { title, image, price, city, location };
    HouseModel.create(data, (error, data) => {
        if (error) {
            console.log("Some Error");
        } else {
            res.redirect('/houses');
        }
    });


});

//Auth Route 
//register 
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    const newUser = new UserModel({ username: req.body.username });
    UserModel.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('/register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/houses');
        });
    });
});

//login 
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/houses',
    failureRedirect: '/login'
}), (req, res) => {});
//logout
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
app.listen(port, () => console.log("Server Started"));