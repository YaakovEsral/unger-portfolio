function get(id) {
    return document.getElementById(id);
}

const mobileNavButton = get('nav-mobile-menu-icon');
const mobileOptionsContainer = get('nav-mobile-options-container');
const mobileExitIcon = get('nav-mobile-exit-icon');
const logo = get('nav-logo');

function toggleMobileOptionsDisplay() {
    // let displayStatus = getComputedStyle(mobileOptionsContainer).display;
    // mobileOptionsContainer.style.display = displayStatus === 'none' ? 'block' : 'none';
    if (mobileOptionsContainer.classList.contains('hidden')) {
        mobileOptionsContainer.classList.remove('hidden');
        logo.classList.add('logo-active');
    } else {
        mobileOptionsContainer.classList.add('hidden');
        logo.classList.remove('logo-active');
    }
    // Do the logo class in JS
}

mobileNavButton.addEventListener('click', toggleMobileOptionsDisplay);
mobileExitIcon.addEventListener('click', toggleMobileOptionsDisplay);


document.body.addEventListener('click', e => console.log(e, e.target))