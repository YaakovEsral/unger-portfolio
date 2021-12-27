const multer = require('multer')
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/* This program is built for taking desktop, mobile, and inside media. All files are stored temporarily in a directory "temp" until validated later for size and dimensions.

Desktop and mobile will have only one per type and will be named "desktop-cover.ext" and "mobile-cover.ext", respectively. As the only variable is the extension name, it is only the extension that is stored in the database.
Inside media can be multiple files. Each file is given a unique id and saved in the same directory as the desktop and mobile.

In addition to naming and storing the different files, I have also included logic to add the file names/extensions to the req.body object. This way, the necessary data is accessible to the next piece of middleware and can be stored in the database. */


const { tempDirectory } = require('../constants');
const { allowedImageTypes } = require('../constants');
const { allowedVideoTypes } = require('../constants');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {

        console.log('storage engine');
        // Create temp directory if not exists
        if (!fs.existsSync(tempDirectory)) {
            fs.mkdirSync(tempDirectory, { recursive: true });
        }
        cb(null, tempDirectory);
    },
    filename: function (req, file, cb) {
        let fileName;
        const ext = path.extname(file.originalname);

        switch (file.fieldname) {
            case 'desktop-cover-photo':
                fileName = 'desktop-cover' + ext;
                req.body.desktopCover = ext;
                break;
            case 'mobile-cover-photo':
                fileName = 'mobile-cover' + ext;
                req.body.mobileCover = ext;
                break;
            case 'single-desktop-inside-media':
                // Note that this array needs to be stringified to be placed in db, but we do it right before the actual sql query
                fileName = 'd-' + uuidv4().substring(0, 12) + ext;
                req.body.desktopInsideMedia = req.body.desktopInsideMedia || [];
                req.body.desktopInsideMedia.push(fileName);
                break;
            case 'single-mobile-inside-media':
                fileName = 'm-' + uuidv4().substring(0, 12) + ext;
                req.body.mobileInsideMedia = req.body.mobileInsideMedia || [];
                req.body.mobileInsideMedia.push(fileName);
                break;
        }

        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    console.log(file);
    // Allow videos also if it's for inside media
    const allowedFileTypes =
        file.fieldname.includes('inside-media') ?
            allowedImageTypes :
            allowedImageTypes.concat(allowedVideoTypes);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(fileExtension)) {
        cb(null, true);
    } else {
        const ext = path.extname(file.originalname);
        const error = new Error(`Bad file type ${ext} - please submit one of the following formats: ${allowedFileTypes.join(', ')}.`);
        error.statusCode = 400;
        cb(error);
    }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;