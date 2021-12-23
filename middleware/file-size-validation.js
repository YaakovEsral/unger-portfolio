const fs = require('fs');
const sizeOf = require('image-size');

module.exports = (req, res, next) => {
    console.log('image size validator');

    // Check the size of files in the temp directory

    // If they are the wrong size,
    // Delete temp directory

    // Return an error

    next();
}