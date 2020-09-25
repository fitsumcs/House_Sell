const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

router.get('/:userNm', (req, res) => {
    res.render('userinfo');
});

module.exports = router;