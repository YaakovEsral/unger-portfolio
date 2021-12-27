const pool = require('../connectionAsync');

module.exports = async (req, res, next) => {
    console.log(req.body);

    let {projectName, slug, projectType, clientName, credits, projectDescription, dateCompleted, desktopCover, mobileCover, desktopInsideMedia, mobileInsideMedia, showOnHomePage} = req.body;

    showOnHomePage = showOnHomePage === 'false' ? 0 : 1;
    
    try {
    await pool.query('INSERT INTO projects(project_name, slug, type, client_name, credits, description, date_completed, desktop_cover_photo, mobile_cover_photo, desktop_inside_media, mobile_inside_media, show_on_homepage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [projectName, slug, projectType, clientName, credits, projectDescription, dateCompleted, desktopCover, mobileCover, JSON.stringify(desktopInsideMedia), JSON.stringify(mobileInsideMedia), showOnHomePage]
    )
    } catch(err) {
        console.error(err);
        return res.status(400).end(err.sqlMessage);
    }

    next();
}