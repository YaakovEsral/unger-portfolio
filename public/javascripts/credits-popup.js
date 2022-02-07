const creditsButton = get('project-credits-button');
const creditsPopup = get('project-credits-popup');
const exitIcon = get('credits-exit-icon');

creditsButton.addEventListener('click', (e) => {
    if (!creditsPopup.classList.contains('hidden-fade') && !e.path.includes(creditsPopup))
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

    if (!e.path.includes(creditsButton) && !e.path.includes(creditsPopup)) {
        fadeHide(creditsPopup)
    }
})