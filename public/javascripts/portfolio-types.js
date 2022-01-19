const selectTypeElements = document.querySelectorAll('input[name="portfolio-tabs"]');
const projectsContainers = document.querySelectorAll('div.portfolio-projects-container');

selectTypeElements.forEach(elem => {
    elem.addEventListener('change', handleTypeSelect)
});

function handleTypeSelect(e) {
    console.log(e.target.value);
    // Add hidden class to all containers
    projectsContainers.forEach(container => hide(container));

    // Remove hidden class from current container
    const currentContainer = Array.from(projectsContainers).find(elem => elem.classList.contains(e.target.value));
    show(currentContainer);
}