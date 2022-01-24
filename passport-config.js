const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./connectionAsync');

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        // Get user from database
        const data = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        // console.log('auth', data[0][0]);
        
        const user = data[0][0];
        if(user == null) {
            return done(null, false, {message: 'No user with that username.'})
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect.'})
            }
        } catch(err) {
            return done(err);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))

    passport.serializeUser((user, done) => done(null, user.user_id))
    passport.deserializeUser(async (id, done) => {
        const data = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        const user_id = data[0][0].user_id;
        done(null, user_id);
     })

}

module.exports = initialize;