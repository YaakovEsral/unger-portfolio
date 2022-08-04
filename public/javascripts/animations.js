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

const fadeUpScrollElems = gsap.utils.toArray('.fade-up-scroll');
fadeUpScrollElems.forEach(elem => addAnimation(elem, 0, 'top 80%'))