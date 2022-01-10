var express = require('express');
var router = express.Router();
const pool = require('../connectionAsync');
const submitProject = require('../middleware/submit-project');
const fileUpload = require('../middleware/file-upload');
const projectDataValidation = require('../middleware/project-data-validation');
const fileSizeValidation = require('../middleware/file-size-validation');
const relocateFiles = require('../middleware/relocate-files');
const generateFileURL = require('../utils/generateFileURL');
const fs = require('fs');

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

router.route('/add-project/:slug?')
    .get(async (req, res, next) => {
        // console.log(req.params.slug)
        if (req.params.slug) {
            try {
                const data = await pool.query('SELECT * FROM projects WHERE slug = ?', [req.params.slug]);
                console.log(data[0][0]);

                // If no data, create an error message and forward to the error handler
                if (!data[0].length) {
                    const error = new Error();
                    error.status = 404;
                    error.message = 'No such project.'
                    return next(error);
                }
                return res.render('admin/add-project', { title: 'Add Project', projectData: data[0][0] });
            }
            catch (err) {
                console.error(err);
                next(err)
            }
        }
        res.render('admin/add-project', { title: 'Add Project' });
    })
    .post(
        fileUpload.fields([
            { name: 'desktop-cover-photo', maxCount: 1 },
            { name: 'mobile-cover-photo', maxCount: 1 },
            { name: 'single-desktop-inside-media' },
            { name: 'single-mobile-inside-media' }
        ]),
        projectDataValidation,
        fileSizeValidation,
        submitProject,
        relocateFiles
    )

router.delete('/delete-image', (req, res, next) => {
    console.log(req.body);
    // Remove file from mysql database

    // Determine which procedure to use based on first char in file name
    const procedure = req.body.file[0] === 'd' ? 'deleteDesktopInsideMedia' : 'deleteMobileInsideMedia';

    try {
        pool.query(`CALL ${procedure}(?, ?)`, [req.body.file, req.body.slug])
    }
    catch(err) {
        err.status = 500;
        err.message = "Error removing file from database."
        console.log(err)
        return next(err);
    }

    // Remove file from file system
    try {
        const fileURL = './public' + generateFileURL.insideMedia(req.body.slug, req.body.file);
        console.log(fileURL)
        fs.unlinkSync(fileURL)
    }
    catch (err) {
        err.status = 500;
        err.message = "Error deleting your file from file system."
        console.log(err)
        return next(err);
    }
    res.end('Delete successful')
})

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
