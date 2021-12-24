const fs = require('fs');
const sizeOf = require('image-size');
const path = require('path');
const { allowedImageTypes } = require('../constants');
const {mobileCoverImage} = require('../constants');
const {desktopCoverImage} = require('../constants');

/* TO DO in this file:
    come up with proper validations for cover images

    write algorithm that all inside media for each project should be same size
*/

module.exports = (req, res, next) => {
    console.log('image size validator');

    // Check the size of files in the temp directory

    const tempDirectory = './temp';
    const files = fs.readdirSync(tempDirectory);
    let insideMediaDimensions;
    files.forEach(file => {
        // only check dimensions if file is an image
        if (allowedImageTypes.includes(path.extname(file))) {
            const dimensions = sizeOf(tempDirectory + '/' + file);
            const { width, height } = dimensions;



            switch (file) {
                case mobileCoverImage:
                case desktopCoverImage:
                    break;
                default:
                    // if (insideMediaDimensions &&
                    //     (insideMediaDimensions.height !== height ||
                    //      insideMediaDimensions.width !== width)) {
                    //          return next(new Error('Inside media'))
                    //      }
                    break;
            }

            console.log(width, height);
        }
    })


    // If they are the wrong size,
    // Delete temp directory
    if (false) {
        fs.rmdirSync(tempDirectory);
        return next(new Error('Incorrect file size'));
    }

    // Return an error

    next();
}