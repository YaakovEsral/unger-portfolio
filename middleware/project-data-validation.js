/* Note that most of this middleware is unlikely to be necessary since there is client side validation. It is primarily in the event of a user tampering with the DOM in DevTools and for the media files which cannot be properly validated on the client side. */

module.exports = (req, res, next) => {
    console.log('data validation middleware', req.body)

    // Set all string 'undefined' values to actual undefined
    for (const key in req.body) {
        if (req.body[key] === 'undefined') {
            req.body[key] = undefined;
        }
    }

    // Put all required fields in an array
    const requiredFields = [req.body.projectName, req.body.projectName, req.body.type, req.body.desktopCover, req.body.mobileCover, req.body.insideMedia, req.body.showOnHomePage];

    // requiredFields.forEach(field => {
    //     if(!field) {
                // Delete temp directory

    //         // Return an error that required fields is missing
    //         return next(new Error(`Missing required field.`))
    //     }
    // })
    next()
}