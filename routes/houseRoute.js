const express = require('express');
const router = express.Router();
const HouseModel = require('../models/house');
const { isLogged, checkOwner } = require('../middleware');

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
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const data = { title, image, price, city, location, author };
    HouseModel.create(data, (error, data) => {
        if (error) {
            console.log("Some Error");
        } else {
            res.redirect('/houses');
        }
    });


});

//Edit route 
router.get('/:id/edit', checkOwner, (req, res) => {

    HouseModel.findById(req.params.id, (err, homes) => {

        res.render('editHouse', { homes });

    });
});
//Update route
router.put('/:id', checkOwner, (req, res) => {
    //find and update
    HouseModel.findByIdAndUpdate(req.params.id, req.body.house, (err, data) => {
        if (err) {
            res.redirect('/');
        } else {
            res.redirect(`/houses/${req.params.id}`);
        }
    });
    // redirect 
});
// delete 
router.delete('/:id', checkOwner, (req, res) => {
    HouseModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/houses');
        } else {
            res.redirect('/houses');
        }
    });
});





module.exports = router;