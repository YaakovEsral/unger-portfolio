const selectTypeElements = document.querySelectorAll('input[name="portfolio-tabs"]');
const projectsContainers = document.querySelectorAll('div.portfolio-projects-container');
let previousContainer;
let newContainer;

selectTypeElements.forEach(elem => {
    elem.addEventListener('change', handleTypeSelect)
});

 /* I think I want to stick with this version. Seems like we have a bug with the code, though. The fade in transition doesn't seem to be working, except for when you slow it down with debugger. */

function handleTypeSelect(e) {
    previousContainer = Array.from(projectsContainers).find(elem => !elem.classList.contains('hidden'));
    newContainer = Array.from(projectsContainers).find(elem => elem.classList.contains(e.target.value));

    fadeHide(previousContainer);
    setTimeout(() => {
        hide(previousContainer)
        show(newContainer);
        fadeShow(newContainer);
    }, 300);
}