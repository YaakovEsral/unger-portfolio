var express = require('express');
var router = express.Router();
const pool = require('../connectionAsync');
const areUserSlotsAvailable = require('../utils/areUserSlotsAvailable');
const bcrypt = require('bcrypt');

const passport = require('passport');

const initializePassport = require('../passport-config');
const { checkNotAuthenticated } = require('../middleware/authentication');
initializePassport(passport);

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

/* AUTHENTICATION ROUTES */

router.get('/register', checkNotAuthenticated, async (req, res) => {

    // Only allow access to this page if there are user slots available
    const usersAvailable = await areUserSlotsAvailable();

    if (!usersAvailable) {
        return res.redirect('/login');
    }

    res.render('./admin/register', { title: 'Register' })
})

router.get('/login', checkNotAuthenticated, async (req, res) => {

    // Get users_available value to pass to render function
    const usersAvailable = await areUserSlotsAvailable();

    res.render('./admin/login', { title: 'Login', slots_available: usersAvailable })
})

router.post('/register', checkNotAuthenticated, async (req, res, next) => {
    console.log('register attempted', req.body)

    // Only allow access to this route if there are user slots available
    const usersAvailable = await areUserSlotsAvailable();

    if (!usersAvailable) {
        return res.redirect('/login');
    }

    // Only allow registry if username and password were submitted
    if (!req.body.username || !req.body.password) {
        req.flash('notification', 'Username and password are required.')
        return res.render('./admin/register');
    }

    // Only allow registry if username is available
    try {
        const data = await pool.query('SELECT username from users WHERE username = ?', [req.body.username]);

        // User is taken if data is returned
        const userTaken = data[0][0];
        if (userTaken) {
            req.flash('notification', 'Username is already taken.')
            return res.render('./admin/register')
        }
    }
    catch (err) {
        return next(err);
    }

    // If all succeeds, hash the password, insert into database, and redirect to login page.
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query('INSERT INTO users(username, password) VALUES(?, ?)', [req.body.username, hashedPassword])
    } catch (err) {
        console.log('Error adding user to database');
        res.redirect('/register');
    }

    req.flash('notification', 'User successfully added.')
    res.redirect('/login')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

router.delete('/logout', (req ,res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;
