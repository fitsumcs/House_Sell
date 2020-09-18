const HouseModel = require('../models/house');
// exported var 
const middleware = {};
//functions 

// house ownership 
middleware.checkOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
        HouseModel.findById(req.params.id, (err, homes) => {
            if (err) {
                res.redirect('back');

            } else {
                // is he auth
                if (homes.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
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


module.exports = middleware;