const pool = require('../connectionAsync');
const USERS_LIMIT = 2;

async function areSlotsAvailable() {
    try {
        const data = await pool.query(' \
            SELECT COUNT(*) AS count from users \
        ');
        const count = data[0][0].count;
        const slotsAvailable = USERS_LIMIT > count;
        return slotsAvailable;
    }
    catch (err) {
        return next(err);
    }
}

module.exports = areSlotsAvailable;