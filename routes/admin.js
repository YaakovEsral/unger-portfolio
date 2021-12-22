var express = require('express');
var router = express.Router();
const pool = require('../connectionAsync');
const submitProject = require('../middleware/submit-project');
const fileUpload = require('../middleware/file-upload');

/* GET admin login page. */
router.get('/', function (req, res) {
    res.render('admin/login', { title: 'Admin' });
});

router.get('/dashboard', async function (req, res, next) {
    try {
        const data = await pool.query('SELECT * FROM projects ORDER BY sequence_num ASC');
        // console.log(data[0]);
        res.render('admin/edit-all-projects', { title: 'Edit All Projects', data: JSON.stringify(data[0]) });
    }
    // catching a network/db error. And throughout
    catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/add-project')
    .get((req, res, next) => {
        res.render('admin/add-project', { title: 'Add Project' });
    })
    .post(fileUpload.fields([
        { name: 'desktop-cover-photo', maxCount: 1 },
        { name: 'mobile-cover-photo', maxCount: 1 },
        { name: 'single-inside-media', maxCount: 10 }
    ]),
        submitProject)

router.post('/update-project-order', (req, res) => {
    // console.log(req.body);
    res.send('request received');
    try {
        pool.query('CALL updateProjectOrder(?, ?)', [req.body.oldIndex, req.body.newIndex])
    }
    catch (err) {
        res.end(err);
    }
})

module.exports = router;
