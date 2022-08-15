function addAnimation(selector, delay, start) {
    gsap.from(selector, {
        scrollTrigger: {
            trigger: selector,
            start: start || ''
        },
        duration: 0.6,
        y: 20,
        autoAlpha: 0
    })
        .delay(delay);
}

addAnimation('.fade-up', .1);
addAnimation('.fade-up-200', .2);
addAnimation('.fade-up-300', .3)
addAnimation('.fade-up-400', .4);
addAnimation('.fade-up-600', .6);
addAnimation('.fade-up-900', .9);

const fadeUpScrollElems = gsap.utils.toArray('.fade-up-scroll');
fadeUpScrollElems.forEach(elem => addAnimation(elem, 0, 'top 80%'))


// animations for portfolio page
const selectTypeElements = gsap.utils.toArray('input[name="portfolio-tabs"]');
const projectsContainers = gsap.utils.toArray('div.portfolio-projects-container');

let oldContainer;
let newContainer = projectsContainers.find(elem => !elem.classList.contains('hidden-portfolio'));

selectTypeElements.forEach(select => {
    select.addEventListener('click', e => {
        oldContainer = newContainer; //projectsContainers.find(elem => !elem.classList.contains('hidden-fade'));
        newContainer = projectsContainers.find(elem => elem.classList.contains(e.target.value));

        // console.log(oldContainer, newContainer);
        
        gsap.to(oldContainer, {duration: .1, autoAlpha: 0, position: 'absolute'})
        gsap.to(newContainer, {duration: 1, autoAlpha: 1, position: 'static'});
    })
})