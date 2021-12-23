function get(id) {
    return document.getElementById(id);
}

function handleTextInput(event) {
    // console.log(event.target.value);
    return event.target.value;
}

function handleRadioInput(event) {
    // console.log(event.target.value);
    return event.target.value;
}

// This handler is can only handle credits key-value pairs
function handleKeyValueInput() {
    const credits = {};

    for (let i = 0; i < allCreditsContainer.children.length; i++) {
        // save the values of the two inputs in each single-credit div
        const key = allCreditsContainer.children[i].children[1].value;
        const value = allCreditsContainer.children[i].children[2].value;
        // console.log(key, value);

        // save them only if they are valid values
        if (key && value)
            credits[key] = value;
    }

    // console.log(formValues, formValues.credits);

    return JSON.stringify(credits);
}

function handleMediaInput(event) {
    // console.log(event);
    // console.log(event.target.parentElement.children[1]);
    const previewImage = event.target.parentElement.children[1];
    // const previewImage = event.target.parentElement.children[/preview/]); // regex for containing "preview" in ID
    const url = URL.createObjectURL(event.target.files[0]);
    previewImage.src = url;
}

function setDefaultSlug(event) {
    // console.log(event.target.value);
    const input = event.target.value;
    const slug = input.toLowerCase().replaceAll(' ', '-');
    // console.log(slug);
    const defaultSlugElem = document.querySelector('#default-slug span');
    defaultSlugElem.innerText = slug;
    return slug;
}

// Starting form values
const formValues = {
    projectName: undefined,
    slug: undefined,
    projectType: 'Branding',
    clientName: undefined,
    credits: undefined,
    projectDescription: undefined,
    dateCompleted: undefined,
    showOnHomePage: undefined
}

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
const allInsideMediaContainer = get('all-inside-media-container');// container
const moreMediaInput = get('more-media-input');             // number input

// Media input
const desktopPhotoInput = get('desktop-cover-photo-input');
const mobilePhotoInput = get('mobile-cover-photo-input');
const insideMediaDiv = get('inside-media-div');

// Buttons
const moreCreditsButton = get('more-credits-button');
const moreMediaButton = get('more-media-button');

// Misc.
var defaultSlug = '';

// listeners for text values
projectNameElem.addEventListener('keyup', e => {
    formValues.projectName = handleTextInput(e);
    defaultSlug = setDefaultSlug(e);
    formValues.slug = formValues.slug || defaultSlug;
} )
slugElem.addEventListener('keyup', e => {
    formValues.slug = handleTextInput(e) || defaultSlug; 
});
clientNameElem.addEventListener('keyup', e => formValues.clientName = handleTextInput(e));
dateCompletedElem.addEventListener('keyup', e => formValues.dateCompleted = handleTextInput(e))
projectDescriptionElem.addEventListener('keyup', e => formValues.projectDescription = handleTextInput(e));

// listeners for radio fields
projectTypeDiv.addEventListener('change', e => formValues.projectType = handleRadioInput(e));
showOnHomePageDiv.addEventListener('change', e => formValues.showOnHomePage = handleRadioInput(e) === 'yes')

// listener for key value field (credits)
creditsDivElem.addEventListener('keyup', () => formValues.credits = handleKeyValueInput());

// listeners for media inputs
desktopPhotoInput.addEventListener('change', e => handleMediaInput(e));
mobilePhotoInput.addEventListener('change', e => handleMediaInput(e));
insideMediaDiv.addEventListener('change', e => handleMediaInput(e));

// adding inputs for credits
moreCreditsButton.addEventListener('click', (e) => {
    // Get the value of moreCreditsInput and append that many single-credits divs
    for (let i = 0; i < +moreCreditsInput.value; i++) {
        allCreditsContainer.insertAdjacentHTML('beforeend',
            `
        <div class="single-credits">
            <span class="credits-delete">&#10006</span>
            <input type="text" name="credit-type" placeholder="Credit Type" />
            <input type="text" name="credit-name" placeholder="Name" />
        </div>
        `
        );
    }
})

// removing inputs for credits
allCreditsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('credits-delete')) {
        e.target.parentElement.remove();
    }
});

// adding inputs for inside media
moreMediaButton.addEventListener('click', (e) => {
    // Get the value of moreMediaInput and append that many single-inside-media divs
    for (let i = 0; i < +moreCreditsInput.value; i++) {
        allInsideMediaContainer.insertAdjacentHTML('beforeend',
            `
        <div class="single-inside-media">
            <span class="inside-media-delete">&#10006</span>
            <img class="inside-media-preview" src="/images/no-image.png">
            <input class="inside-media-input" type="file" name="single-inside-media" />
        </div>
        `
        );
    }
})

// removing inputs for inside media
allInsideMediaContainer.addEventListener('click', e => {
    if (e.target.classList.contains('inside-media-delete')) {
        e.target.parentElement.remove();
    }
});

addProjectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // console.log(formValues);

    const formData = new FormData();
    const entries = Object.entries(formValues);
    entries.forEach(([key, value]) => {
        formData.append(key, value);
    })

    formData.append('desktop-cover-photo', desktopPhotoInput.files[0]);
    formData.append('mobile-cover-photo', mobilePhotoInput.files[0]);
    const insideMediaInputs = document.querySelectorAll('.inside-media-input');
    insideMediaInputs.forEach(input => formData.append('single-inside-media', input.files[0]));

    // for (var value of formData.values()) {
    //     console.log('fd', value);
    //  }


    try {
        // Note that default format is multipart
        const response = await fetch('/admin/add-project', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.status} - ${message || response.statusText}`);
        }
        return response;
    } catch (err) {
        console.error(err);
        return err;
    }

})