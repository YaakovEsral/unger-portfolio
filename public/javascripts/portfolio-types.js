const selectTypeElements = gsap.utils.toArray('input[name="portfolio-tabs"]');
const projectsContainers = gsap.utils.toArray('div.portfolio-projects-container');
let oldContainer;
let newContainer;

selectTypeElements.forEach(elem => {
    elem.addEventListener('change', handleTypeSelect)
});

console.log('script loadedddd')
 /* I think I want to stick with this version. Seems like we have a bug with the code, though. The fade in transition doesn't seem to be working, except for when you slow it down with debugger. */

function handleTypeSelect(e) {
    // previousContainer = Array.from(projectsContainers).find(elem => !elem.classList.contains('hidden'));
    oldContainer = projectsContainers.find(elem => !elem.classList.contains('no-width'));
    newContainer = projectsContainers.find(elem => elem.classList.contains(e.target.value));

    fadeHide(oldContainer);
    // widthHide(previousContainer);
    // hide(previousContainer)
    setTimeout(() => {
        // hide(previousContainer)
        widthHide(oldContainer);
        // show(newContainer);
        widthShow(newContainer)


        fadeShow(newContainer);
        // widthShow(newContainer)
    }, 300);
}