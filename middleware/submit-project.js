const pool = require('../connectionAsync');

module.exports = async (req, res, next) => {
    console.log(req.body);

    let {projectName, slug, projectType, clientName, credits, projectDescription, dateCompleted, desktopCover, mobileCover, insideMedia, showOnHomePage} = req.body;

    showOnHomePage = showOnHomePage === 'false' ? 0 : 1;
    
    try {
    await pool.query('INSERT INTO projects(project_name, slug, type, client_name, credits, description, date_completed, desktop_cover_photo, mobile_cover_photo, inside_photos_and_videos, show_on_homepage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [projectName, slug, projectType, clientName, credits, projectDescription, dateCompleted, desktopCover, mobileCover, JSON.stringify(insideMedia), showOnHomePage]
    )
    } catch(err) {
        console.error(err);
        return res.status(400).end(err.sqlMessage);
    }

    next();
}