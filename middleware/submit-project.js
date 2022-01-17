const pool = require('../connectionAsync');

module.exports = async (req, res, next) => {
    console.log('submitting project to db');
    console.log(req.body);

    let { projectName, slug, projectType, clientName, credits, projectDescription, dateCompleted, desktopCover, mobileCover, desktopInsideMedia, mobileInsideMedia, showOnHomePage, projectID } = req.body;

    // If this is an edit to a pre-existing project
    if (req.body.projectID) {
        /* As of now - user cannot change slug name, since it is also the directory name for the project's media, and we would need to create a new directory with the same files. Which I don't currently feel like doing. Note also that the stored procedure has been updated to not modify the slug. */

        // If there is inside media and we are updating, we need to send it as a comma separated string in order that it can be appended properly to the SQL JSON array. If we are inserting, though, it needs to be a stringified array.

        if (desktopInsideMedia)
            desktopInsideMedia = desktopInsideMedia.join(',')

        if (mobileInsideMedia)
            mobileInsideMedia = mobileInsideMedia.join(',')

        try {
            await pool.query('CALL updateProject(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [projectName, /* slug, */ projectType, clientName, credits, projectDescription, dateCompleted, desktopCover, mobileCover, desktopInsideMedia, mobileInsideMedia, showOnHomePage, projectID]
            )
        } catch (err) {
            console.error(err);
            return res.status(400).end(err.sqlMessage);
        }

        console.log('submitted to db')
    }

    // If this is the initial submission of a project
    else {
        try {
            await pool.query('INSERT INTO projects(project_name, slug, type, client_name, credits, description, date_completed, desktop_cover_photo, mobile_cover_photo, desktop_inside_media, mobile_inside_media, show_on_homepage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [projectName, slug, projectType, clientName, credits, projectDescription, dateCompleted, desktopCover, mobileCover, JSON.stringify(desktopInsideMedia), JSON.stringify(mobileInsideMedia), showOnHomePage]
            )
        } catch (err) {
            console.error(err);
            return res.status(400).end(err.sqlMessage);
        }
    }
    next();
}