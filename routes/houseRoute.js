const express = require('express');
const router = express.Router();
const HouseModel = require('../models/house');
const UserModel = require('../models/user');
const { isLogged, checkOwner } = require('../middleware');

router.get('/allhouse/:page', async(req, res) => {

    const resPerPage = 6; // results per page
    const page = req.params.page || 1; // Page


    try {


        // Find Demanded Products - Skipping page values, limit results per page
        const homes = await HouseModel.find()
            .sort({ createdAt: -1 })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage);
        // Count how many products were found
        const numOfHomes = await HouseModel.countDocuments();
        // Renders The Page
        res.render('home', {
            homes: homes,
            currentPage: page,
            pages: Math.ceil(numOfHomes / resPerPage),
            numOfResults: numOfHomes
        });

    } catch (err) {
        console.log("Some Internal Error " + err);
    }

});
//self post
router.get('/selfpost/:page', async(req, res) => {

    const resPerPage = 6; // results per page
    const page = req.params.page || 1; // Page


    try {


        // Find Demanded Products - Skipping page values, limit results per page
        const homes = await HouseModel.find({ 'author.id': req.user._id })
            .sort({ createdAt: -1 })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage);
        // Count how many products were found
        const numOfHomes = await HouseModel.countDocuments({ 'author.id': req.user._id });
        // Renders The Page
        res.render('home', {
            homes: homes,
            currentPage: page,
            pages: Math.ceil(numOfHomes / resPerPage),
            numOfResults: numOfHomes
        });

    } catch (err) {
        console.log("Some Internal Error " + err);
    }

});
// new house form view
router.get('/new', isLogged, (req, res) => {
    res.render('newHouse');
});
// view single house form view
router.get('/:id', async(req, res) => {
    HouseModel.findById(req.params.id, (error, home) => {
        if (error) {
            console.log("Some Error");

        } else {
            const theUser = UserModel.findById(home.author.id, (err, user) => {
                if (err) return console.log(err);
                HouseModel.countDocuments({ 'author.id': user._id }, (err, countPost) => {
                    if (err) return console.log(err);
                    res.render('houseDetail', { home, user, countPost });
                });

            });

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
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const data = { title, image, price, city, location, description, author };
    HouseModel.create(data, (error, data) => {
        if (error) {
            console.log("Some Error");
        } else {
            req.flash("success", "You have Added new House!");
            res.redirect('/houses/allhouse/1');
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
            req.flash("success", "You have Updated House Info!");
            res.redirect(`/houses/${req.params.id}`);
        }
    });
    // redirect 
});
// delete 
router.delete('/:id', checkOwner, (req, res) => {
    HouseModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/houses/allhouse/1');
        } else {
            req.flash("error", "You have Deleted House Info!");
            res.redirect('/houses/allhouse/1');
        }
    });
});





module.exports = router;