const HouseModel = require('../models/house');
// exported var 
const middleware = {};
//functions 

// house ownership 
middleware.checkOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        HouseModel.findById(req.params.id, (err, homes) => {
            if (err) {
                req.flash("error", "Sorry House Not Found!!");
                res.redirect('back');

            } else {
                // is he auth
                if (homes.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Sorry Permission Denied!!");
                    res.redirect('/houses');
                }

            }

        });

    } else {
        res.redirect('back');
    }

};
//check login
middleware.isLogged = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login!");
    res.redirect('/login');
};
//check logout 
//check login
middleware.isLoggedOut = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};



module.exports = middleware;