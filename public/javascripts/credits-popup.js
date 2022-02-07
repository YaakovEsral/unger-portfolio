const creditsButton = get('project-credits-button');
const creditsPopup = get('project-credits-popup');
const exitIcon = get('credits-exit-icon');

creditsButton.addEventListener('click', (e) => {
    // Had to do extra coding since Firefox doesn't yet have "path" attribute on "event"
    if (!creditsPopup.classList.contains('hidden-fade') && 
        e.target !== creditsPopup &&
        e.target.parentNode !== creditsPopup)
        return fadeHide(creditsPopup);
    if (e.target === creditsButton)
        // show(creditsPopup)
        fadeShow(creditsPopup);
    // console.log(e.target);
});

exitIcon.addEventListener('click', () => {
    // console.log('clicked');
    // hide(creditsPopup) 
    fadeHide(creditsPopup);
});

document.body.addEventListener('click', e => {

    if (e.target !== creditsButton && 
        e.target !== creditsPopup && 
        e.target.parentNode !== creditsPopup) {
        fadeHide(creditsPopup)
    }
})