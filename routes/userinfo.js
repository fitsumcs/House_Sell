const express = require('express');
const router = express.Router();
const { isLogged } = require('../middleware');

router.get('/:userNm', isLogged, (req, res) => {
    res.render('userinfo');
});

module.exports = router;