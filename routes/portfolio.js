const express = require('express');
const router = express.Router();

const pool = require('../connectionAsync');


/* GET portfolio page */
router.get('/', async (req, res, next) => {
    try {
        const data = await pool.query('SELECT * FROM projects');
        // console.log(data[0]);
        // console.log(data[0][0]);
        res.render('portfolio', { data: data[0] });
    }
    // catching a network/db error. And throughout
    catch (err) {
        console.error(err);
        next(err);
    }



})

/* GET specific project page */
router.get('/:slug', async (req, res, next) => {
    // console.log(req.params.slug);

    try {
        const data = await pool.query('SELECT * FROM projects WHERE slug = ?', [req.params.slug]);
        // console.log(data[0]);

        // If no data, create an error message and forward to the error handler
        if (!data[0].length) {
            const error = new Error();
            error.status = 404;
            error.message = 'No such page.'
            return next(error);
        }
        res.render('single-project', { data: data[0][0] });
    }
    catch (err) {
        console.error(err);
        next(err)
    }
})

module.exports = router;