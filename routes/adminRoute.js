const express = require('express');
const router = express.Router();
const HouseModel = require('../models/house');
const UserModel = require('../models/user');


//admin dashboard 
router.get('/admin', async(req, res) => {
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

// delete 
router.delete('/admin/user/:id', (req, res) => {
    UserModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/admin');
        } else {
            // req.flash("error", "You have Deleted House Info!");
            res.redirect('/admin');
        }
    });
});
module.exports = router;