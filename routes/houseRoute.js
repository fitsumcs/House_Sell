const express = require('express');
const router = express.Router();
const HouseModel = require('../models/house');
router.get('/houses', (req, res) => {
    HouseModel.find({}, (error, homes) => {
        if (error) {
            console.log("Some DB error");
        } else {
            res.render('home', { homes });
        }
    });

});
// new house form view
router.get('/houses/new', (req, res) => {
    res.render('newHouse');
});
// view single house form view
router.get('/houses/:id', (req, res) => {
    HouseModel.findById(req.params.id, (error, home) => {
        if (error) {
            console.log("Some Error");

        } else {
            res.render('houseDetail', { home });
        }

    });

});
// add new house 
router.post('/houses', (req, res) => {

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

module.exports = router;