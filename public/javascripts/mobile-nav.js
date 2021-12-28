function get(id) {
    return document.getElementById(id);
}

const mobileNavButton = get('nav-mobile-menu-icon');
const mobileOverlay = get('nav-mobile-overlay');
const mobileOptionsContainer = get('nav-mobile-options-container');
const mobileExitIcon = get('nav-mobile-exit-icon');
const logo = get('nav-logo');

function toggleMobileOptionsDisplay() {
    // let displayStatus = getComputedStyle(mobileOptionsContainer).display;
    // mobileOptionsContainer.style.display = displayStatus === 'none' ? 'block' : 'none';
    if (mobileOverlay.classList.contains('hidden')) {
        mobileOverlay.classList.remove('hidden');
        // logo.classList.add('logo-active');
    } else {
        mobileOverlay.classList.add('hidden');
        // logo.classList.remove('logo-active');
    }
}

mobileNavButton.addEventListener('click', toggleMobileOptionsDisplay);
mobileExitIcon.addEventListener('click', toggleMobileOptionsDisplay);


// document.body.addEventListener('click', e => console.log(e, e.target))