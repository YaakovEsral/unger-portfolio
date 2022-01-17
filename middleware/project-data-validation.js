/* Note that most of this middleware is unlikely to be necessary since there is client side validation. It is primarily in the event of a user tampering with the DOM in DevTools and for the media files which cannot be properly validated on the client side. */

const fs = require('fs');
const tempDirectory = require('../constants').tempDirectory;

module.exports = (req, res, next) => {


    // Set all string 'undefined' values to actual undefined
    for (const key in req.body) {
        if (req.body[key] === 'undefined') {
            req.body[key] = undefined;
        }
        if (req.body.projectID)
            req.body.projectID = +req.body.projectID;

        if (req.body.showOnHomePage)
            req.body.showOnHomePage = req.body.showOnHomePage === 'false' ? 0 : 1;
    }

    if (req.body.projectID) {
        console.log('Skipping validation for already saved project');
        return next();
    }
    console.log('data validation middleware')

    // Put all required fields in an array
    // Note that project type and showOnHomePage are required in the db, but are not validated here since the db gives them a default value.
    const requiredFields = {ProjectName: req.body.projectName, DesktopCover: req.body.desktopCover, MobileCover: req.body.mobileCover, DesktopInsideMedia: req.body.desktopInsideMedia, MobileInsideMedia: req.body.mobileInsideMedia};

    try {
        Object.entries(requiredFields).forEach( ([key, value]) => {
            if (!value) {
                // Delete temp directory
                fs.rmdirSync(tempDirectory, { recursive: true });

                // Return an error that required fields is missing
                const error = new Error(`Missing required field ${key}.`);
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