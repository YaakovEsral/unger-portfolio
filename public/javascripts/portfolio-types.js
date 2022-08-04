const selectTypeElements = document.querySelectorAll('input[name="portfolio-tabs"]');
const projectsContainers = document.querySelectorAll('div.portfolio-projects-container');
let previousContainer;
let newContainer;

selectTypeElements.forEach(elem => {
    elem.addEventListener('change', handleTypeSelect)
});

console.log('script loadedddd')
 /* I think I want to stick with this version. Seems like we have a bug with the code, though. The fade in transition doesn't seem to be working, except for when you slow it down with debugger. */

function handleTypeSelect(e) {
    // previousContainer = Array.from(projectsContainers).find(elem => !elem.classList.contains('hidden'));
    previousContainer = Array.from(projectsContainers).find(elem => !elem.classList.contains('no-width'));
    newContainer = Array.from(projectsContainers).find(elem => elem.classList.contains(e.target.value));

    fadeHide(previousContainer);
    // widthHide(previousContainer);
    // hide(previousContainer)
    setTimeout(() => {
        // hide(previousContainer)
        widthHide(previousContainer);
        // show(newContainer);
        widthShow(newContainer)
        // Array.from(previousContainer.children).forEach(child => child.classList.remove('aos-animate'))
        // Array.from(newContainer.children).forEach(child =>  {
        //     child.classList.remove('aos-animate')
        //     child.classList.add('aos-animate') 
        // })
        AOS.refresh();

        fadeShow(newContainer);
        // widthShow(newContainer)
    }, 300);
}