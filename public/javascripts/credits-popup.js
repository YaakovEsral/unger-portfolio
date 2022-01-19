const creditsButton = get('project-credits-button');
const creditsPopup = get('project-credits-popup');

creditsButton.addEventListener('click', (e) => {
    if(e.target===creditsButton)
        // show(creditsPopup)
        fadeShow(creditsPopup);
    // console.log(e.target);
});

creditsPopup.addEventListener('click', () => {
    // console.log('clicked');
    // hide(creditsPopup) 
    fadeHide(creditsPopup);
});