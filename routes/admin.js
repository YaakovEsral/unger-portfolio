var express = require('express');
var router = express.Router();
const pool = require('../connectionAsync');

/* GET home page. */
router.get('/', async function (req, res, next) {

        res.render('admin/login', { title: 'Admin' });

});

module.exports = router;
