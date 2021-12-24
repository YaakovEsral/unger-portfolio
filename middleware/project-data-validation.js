/* Note that most of this middleware is unlikely to be necessary since there is client side validation. It is primarily in the event of a user tampering with the DOM in DevTools and for the media files which cannot be properly validated on the client side. */

const fs = require('fs');
const tempDirectory = require('../constants').tempDirectory;

module.exports = (req, res, next) => {
    console.log('data validation middleware', req.body)

    // Set all string 'undefined' values to actual undefined
    for (const key in req.body) {
        if (req.body[key] === 'undefined') {
            req.body[key] = undefined;
        }
    }

    // Put all required fields in an array
    // Note that project type and showOnHomePage are required in the db, but are not validated here since the db gives them a default value.
    const requiredFields = [req.body.projectName, req.body.projectName, req.body.desktopCover, req.body.mobileCover, req.body.insideMedia];

    try {
        requiredFields.forEach(field => {
            if (!field) {
                // Delete temp directory
                fs.rmdirSync(tempDirectory, { recursive: true });

                // Return an error that required fields is missing
                const error = new Error(`Missing required field.`);
                error.type = 'add-project-form';
                throw error;
            }
        })
    }
    catch (err) {
        return next(err)
    }
    
    next()
}