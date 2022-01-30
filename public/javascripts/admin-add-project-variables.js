/* This file declares the variables needed for the admin add-project.js file. */

// The form
const addProjectForm = get('add-project-form');

// Elements
const projectNameElem = get('input-project-name');          // text
const slugElem = get('input-project-slug');                 // text
const projectTypeDiv = get('project-type-div');             // radio
const clientNameElem = get('input-client-name');            // text
const creditsDivElem = get('credits-div');                  // key value pairs
const projectDescriptionElem = get('input-project-description');   // text
const dateCompletedElem = get('input-date-completed');      // text
const showOnHomePageDiv = get('show-on-homepage-div');        // radio

const allCreditsContainer = get('all-single-credits-container');// container
const moreCreditsInput = get('more-credits-input');          // number input
const allDesktopInsideMediaContainer = get('all-desktop-inside-media-container');// container
const allMobileInsideMediaContainer = get('all-mobile-inside-media-container');// container
const moreDesktopMediaInput = get('more-desktop-media-input');             // number input
const moreMobileMediaInput = get('more-mobile-media-input');             // number input

// Media input
const desktopPhotoInput = get('desktop-cover-photo-input');
const mobilePhotoInput = get('mobile-cover-photo-input');
const desktopInsideMediaInput = get('desktop-inside-media-input');
const mobileInsideMediaInput = get('mobile-inside-media-input');

// Buttons
const moreCreditsButton = get('more-credits-button');
const moreDesktopMediaButton = get('more-desktop-media-button');
const moreMobileMediaButton = get('more-mobile-media-button');

// Misc.
const defaultSlug = '';
const desktopInsideMediaFiles = [];
const mobileInsideMediaFiles = [];