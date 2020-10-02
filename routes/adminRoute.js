const express = require('express');
const router = express.Router();
const HouseModel = require('../models/house');
const UserModel = require('../models/user');
const { isLogged } = require('../middleware');

//admin dashboard 
router.get('/', isLogged, async(req, res) => {
    // Count how many products were found
    const allUsers = await UserModel.find({});
    const numOfHomes = await HouseModel.countDocuments();
    const numOfUsers = await UserModel.countDocuments();
    const data = {
        allUsers,
        numOfHomes,
        numOfUsers
    };
    res.render('admin/admin', data);
});
//admin dashboard for posts 
router.get('/posts', isLogged, async(req, res) => {
    // Count how many products were found
    const allHouse = await HouseModel.find({});
    const numOfHomes = await HouseModel.countDocuments();
    const numOfUsers = await UserModel.countDocuments();
    const data = {
        allHouse,
        numOfHomes,
        numOfUsers
    };
    res.render('admin/posts', data);
});
// delete user
router.delete('/user/:id', isLogged, (req, res) => {
    UserModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/admin');
        } else {

            HouseModel.deleteMany({ 'author.id': req.params.id }, (err) => {
                if (err) {
                    res.redirect('/admin');
                } else {
                    // req.flash("error", "You have Deleted House Info!");
                    res.redirect('/admin');
                }
            });

        }
    });
});
// delete house
router.delete('/posts/:id', isLogged, (req, res) => {
    HouseModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/admin/posts');
        } else {
            // req.flash("error", "You have Deleted House Info!");
            res.redirect('/admin/posts');
        }
    });
});
module.exports = router;