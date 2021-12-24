const fs = require('fs');
const path = require('path');
const { runInNewContext } = require('vm');

/* All media should end up in the same directory project-media. The path is the same for all files, with the distinguishing factor being the project slug. An example of a path with the name Kumzitz Corner might be './public/images/project-media/kumzitz-corner'. 
*/

//  finalDestination example: './public/images/project-media/kumzitz-corner

const tempDirectory = './temp';

module.exports = (req, res, next) => {
    console.log('relocating files');

    const projectMediaDir = './public/images/project-media';

    const currentProjectDir = req.body.slug;
    const finalDestination = projectMediaDir + '/' + currentProjectDir;

    // Create directory for final destination
    if (!fs.existsSync(finalDestination)) {
        fs.mkdirSync(finalDestination, { recursive: true });
    }

    // Get array of files in temp directory
    const files = fs.readdirSync(tempDirectory);
    
    // Copy files to final destination
    files.forEach(file => {
        const oldFile = path.join(tempDirectory, file);
        const newFile = path.join(finalDestination, file);
        // console.log('old dest', oldFile);
        // console.log('new dest', newFile);
        fs.renameSync(oldFile, newFile)
    })

    // Delete temp directory
    fs.rmdirSync(tempDirectory)
    console.log('created new directory for files');
    res.json(req.body);
}