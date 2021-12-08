var express = require('express');
var router = express.Router();
const pool = require('../connectionAsync');

/* GET home page. */
router.get('/', async function(req, res, next) {
    let data;
    try {
        data = await pool.query('SELECT * FROM projects WHERE show_on_homepage = 1');
        console.log(data[0]);
    }
    // catching a network/db error. And throughout
    catch (err) {
        console.error(err);

    }


  res.render('index', { title: 'Meir Unger - Home', data:  data[0]});

  // get all home page projects
});

/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Meir Unger - About' });
  
  });

  /* GET contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Meir Unger - Contact' });
  
  });

module.exports = router;
