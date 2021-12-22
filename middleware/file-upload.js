const multer = require('multer')
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
// const sharp = require('sharp');

/* This program is built for taking desktop, mobile, and inside media. All media should end up in the same directory project-media. The path is the same for all files, with the distinguishing factor being the project slug. An example of a path with the name Kumzitz Corner might be './public/images/project-media/kumzitz-corner'. 
Desktop and mobile will have only one per type and will be named "desktop-cover.ext" and "mobile-cover.ext", respectively. As the only variable is the extension name, it is only the extension that is stored in the database.
Inside media can be multiple files. Each file is given a unique id and saved in the same directory as the desktop and mobile.
In addition to naming and storing the different files, I have also included logic to add the file names/extensions to the req.body object. This way, the necessary data is accessible to the next piece of middleware and can be stored in the database.
*/

const projectMediaDir = './public/images/project-media';

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        // console.log('req details', req.body);
        // console.log('file details', file);
        // finalDestination example: './public/images/project-media/kumzitz-corner

        const currentProjectDir = req.body.slug;
        const finalDestination = projectMediaDir + '/' + currentProjectDir;
        if (!fs.existsSync(finalDestination)) {
            fs.mkdirSync(finalDestination, { recursive: true });
        }
        cb(null, finalDestination);
    },
    filename: function (req, file, cb) {
        let fileName;
        const ext =  path.extname(file.originalname);

        switch(file.fieldname) {
            case 'desktop-cover-photo':
                fileName = 'desktop-cover' + ext;
                req.body.desktopCover = ext;
                break;
            case 'mobile-cover-photo':
                fileName = 'mobile-cover' + ext;
                req.body.mobileCover = ext;
                break;
            default:
                fileName = uuidv4().substring(0, 12) + ext;
                req.body.insideMedia = req.body.insideMedia || [];
                req.body.insideMedia.push(fileName);
                break;
        }
        
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
        console.log('file filter');
    } else {
        const error = new Error(`Bad file type - please submit one of the final formats: ${allowedFileTypes.join(', ')}.`);
        error.statusCode = 400;
        cb(error);
    }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;