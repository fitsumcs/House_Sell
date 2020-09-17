const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const passport = require('passport');
//Auth Route 
//register 
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
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
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/houses',
    failureRedirect: '/login'
}), (req, res) => {});
//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;