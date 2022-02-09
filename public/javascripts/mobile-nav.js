const mobileNavButton = get('nav-mobile-menu-icon');
const mobileOverlay = get('nav-mobile-overlay');
const mobileOptionsContainer = get('nav-mobile-options-container');
const mobileExitIcon = get('nav-mobile-exit-icon');
const logo = get('nav-logo');

function toggleMobileOptionsDisplay() {
    // Show overlay
    if (mobileOverlay.classList.contains('hidden')) {
        show(mobileOverlay);
        mobileOverlay.classList.remove('overlay-fade-out');
        show(mobileOptionsContainer);
        // logo.classList.add('logo-active');
    } else {
        // Hide overlay
        mobileOverlay.classList.add('overlay-fade-out');
        mobileOptionsContainer.classList.add('hidden-slide-left')
        // logo.classList.remove('logo-active');
    }
}

mobileNavButton.addEventListener('click', toggleMobileOptionsDisplay);
mobileExitIcon.addEventListener('click', toggleMobileOptionsDisplay);

mobileOverlay.addEventListener('animationend', () => {
    if(mobileOverlay.classList.contains('overlay-fade-out') ) {
        hide(mobileOverlay);
        mobileOptionsContainer.classList.remove('hidden-slide-left'); // On a boring day, try figuring out why this line is necessary
    }
})

// document.body.addEventListener('click', e => console.log(e, e.target))