module.exports =  {
    mobileCover,
    desktopCover
}

function mobileCover(project) {
    return `/images/project-media/${project.slug}/mobile-cover${project.mobile_cover_photo}`;   
}

function desktopCover(project) {
    return `/images/project-media/${project.slug}/desktop-cover${project.desktop_cover_photo}`;   
}

// function mobileInside(project) {
//     return `/images/project-media/${project.slug}/${project.desktop}`;   
// }