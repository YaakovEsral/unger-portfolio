module.exports =  {
    directory,
    mobileCover,
    desktopCover,
    insideMedia
}

function directory(slug) {
    return `/images/project-media/${slug}`;
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