const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// port 
const port = process.env.PORT || 3000;
// db url 
const database_url = process.env.DB_URL || 'mongodb://localhost/house_db';

//connection
mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true });
const houseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
// the model
const HouseModel = mongoose.model('House', houseSchema);



// The app 
const app = express();

// config 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

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
app.listen(port, () => console.log("Server Started"));