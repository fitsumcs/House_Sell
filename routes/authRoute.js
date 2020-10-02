const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const passport = require('passport');
const url = require('url');
const { isLoggedOut } = require('../middleware');
//Auth Route 
//register 
router.get('/register', isLoggedOut, (req, res) => {
    res.render('register');
});
router.post('/register', isLoggedOut, (req, res) => {
    const newUser = new UserModel({ firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, birthDate: req.body.birthdate, email: req.body.email, phone: req.body.phone });
    if (req.body.password !== req.body.password2) {
        req.flash("error", "Password Does not match!!");
        return res.redirect('/register');
    }
    UserModel.register(newUser, req.body.password, (err, user) => {


        if (err) {
            req.flash("error", err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash("success", `Welcome ${user.username}`);
            res.redirect('/houses//allhouse/1');
        });
    });
});

//login 
router.get('/login', isLoggedOut, (req, res) => {

    res.render('login');
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                req.flash("error", "User Name or Password Incorrect!");
                return res.redirect('/login');
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                if (user.role === 'admin') {
                    return res.redirect('/admin');
                }

                return res.redirect('/');
            });

        })(req, res, next);
});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "Good Bye!!");
    res.redirect('/');
});

module.exports = router;