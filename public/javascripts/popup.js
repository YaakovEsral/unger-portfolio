const creditsButton = get('project-credits-button');
const creditsPopup = get('project-credits-popup');

creditsButton.addEventListener('click', (e) => {
    if(e.target===creditsButton)
        // show(creditsPopup)
        creditsPopup.classList.remove('hidden-transition')
    // console.log(e.target);
});

creditsPopup.addEventListener('click', () => {
    // console.log('clicked');
    // hide(creditsPopup) 
    creditsPopup.classList.add('hidden-transition')
});

Popper.createPopper(creditsButton, creditsPopup, {
    placement: 'right'
})