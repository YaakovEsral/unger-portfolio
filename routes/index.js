var express = require('express');
var router = express.Router();
const pool = require('../connectionAsync');

/* Note the method with which we are passing data to the client. Pug cannot render objects, so we must stringify the object on our end. When we sent it to Pug, Pug also cannot print out the object's value. However, it can use a for each loop to render the individual pieces of data in each object in their proper form. See comment in index.pug. */

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const data = await pool.query('SELECT * FROM projects WHERE show_on_homepage = 1 ORDER BY sequence_num ASC');
        // console.log(data[0]);
        res.render('index', { title: 'Meir Unger - Home', data: JSON.stringify(data[0]) });
    }
    // catching a network/db error. And throughout
    catch (err) {
        console.error(err);

    }
});

/* GET about page. */
router.get('/about', function (req, res) {
    res.render('about', { title: 'Meir Unger - About' });

});

/* GET contact page. */
router.get('/contact', function (req, res) {
    res.render('contact', { title: 'Meir Unger - Contact' });
});

module.exports = router;
