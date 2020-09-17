const express = require('express');
const router = express.Router();
const HouseModel = require('../models/house');

router.get('/', (req, res) => {
    HouseModel.find({}, (error, homes) => {
        if (error) {
            console.log("Some DB error");
        } else {
            res.render('home', { homes });
        }
    });

});
// new house form view
router.get('/new', isLogged, (req, res) => {
    res.render('newHouse');
});
// view single house form view
router.get('/:id', (req, res) => {
    HouseModel.findById(req.params.id, (error, home) => {
        if (error) {
            console.log("Some Error");

        } else {
            res.render('houseDetail', { home });
        }

    });

});
// add new house 
router.post('/', isLogged, (req, res) => {

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

//check login
function isLogged(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');


}

module.exports = router;