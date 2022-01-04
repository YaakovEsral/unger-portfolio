module.exports =  {
    mobileCover,
    desktopCover,
    insideMedia
}

function mobileCover(project) {
    return `/images/project-media/${project.slug}/mobile-cover${project.mobile_cover_photo}`;   
}

function desktopCover(project) {
    return `/images/project-media/${project.slug}/desktop-cover${project.desktop_cover_photo}`;   
}

function insideMedia(slug, fileName) {
    return `/images/project-media/${slug}/${fileName}`;   
}