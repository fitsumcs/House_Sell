const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const { isLogged, checkOwner } = require('../middleware');


router.get('/changepassword', isLogged, (req, res) => {
    res.render('changePass');
});

router.post('/changepassword', isLogged, function(req, res) {

    if (req.body.password !== req.body.password2) {
        req.flash("error", "Password Does not match!!");
        return res.redirect('/changepassword');
    }
    UserModel.findById(req.user.id, (err, user) => {
        // Check if error connecting
        if (err) {
            return console.log(err); // Return error
        } else {
            // Check if user was found in database
            if (!user) {
                console.log(err); // Return error, user was not found in db
            } else {
                user.setPassword(req.body.password, function(err, newPass) {
                    if (err) {
                        console.log(err);
                    } else {
                        newPass.save();
                        req.flash("success", "Password Changed !!");
                        res.redirect('/houses/allhouse/1');
                    }
                });
            }
        }
    });
});
module.exports = router;