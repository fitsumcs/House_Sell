const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const { isLogged } = require('../middleware');

router.get('/:userNm', isLogged, (req, res) => {
    res.render('userinfo');
});
//Edit route 
router.get('/:id/edit', isLogged, (req, res) => {

    UserModel.findById(req.params.id, (err, homes) => {

        res.render('editUser', { homes });

    });
});
//Update route
router.put('/:id', isLogged, (req, res) => {
    //find and update
    UserModel.findByIdAndUpdate(req.params.id, req.body.user, (err, data) => {
        if (err) {
            res.redirect('/');
        } else {
            req.flash("success", "You have Updated Your User Info!");
            res.redirect(`/user/${data.username}`);
        }
    });
    // redirect 
});
module.exports = router;