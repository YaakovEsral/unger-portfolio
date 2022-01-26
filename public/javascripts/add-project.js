/* 
Variables are defined in admin-add-project-variables.js.
Functions are in handle-admin-inputs.js

This file puts everything together - adding listeners for change and submit events.
*/

// Starting form values
const formValues = {
    projectName: projectNameElem.value,
    slug: slugElem.value,
    projectType: document.querySelector('input[name="project-type"]:checked').value,
    clientName: clientNameElem.value,
    credits: handleKeyValueInput(), // always returns a truthy value, beware
    projectDescription: projectDescriptionElem.value,
    dateCompleted: dateCompletedElem.value,
    showOnHomePage: document.querySelector('input[name="show-on-homepage"]:checked').value,
    projectID: get('project-id').value
}

function setDefaultSlug(event) {
    // console.log(event.target.value);
    const input = event.target.value;
    const slug = input.toLowerCase().replace(/\s/g, '-').replace(/\W^-/g, '');
    // console.log(slug);
    const defaultSlugElem = document.querySelector('#default-slug span');
    defaultSlugElem.innerText = slug;
    return slug;
}

// Note that projectType and showOnHomePage are set automatically in db if they are left null.
// Project type defaults to branding and showOnHomePage defaults to 0 (false);

// console.log(formValues);

// listeners for text values
projectNameElem.addEventListener('change', e => {
    formValues.projectName = handleTextInput(e);
    defaultSlug = setDefaultSlug(e);
    formValues.slug = slugElem.value || defaultSlug;
})
slugElem.addEventListener('change', e => {
    formValues.slug = handleTextInput(e) || defaultSlug;
});
clientNameElem.addEventListener('change', e => formValues.clientName = handleTextInput(e));
dateCompletedElem.addEventListener('change', e => formValues.dateCompleted = handleTextInput(e))
projectDescriptionElem.addEventListener('change', e => formValues.projectDescription = handleTextInput(e));

// listeners for radio fields
projectTypeDiv.addEventListener('change', e => formValues.projectType = handleRadioInput(e));
showOnHomePageDiv.addEventListener('change', e => formValues.showOnHomePage = handleRadioInput(e) === 'yes')

// listener for key value field (credits)
creditsDivElem.addEventListener('change', () => formValues.credits = handleKeyValueInput());

// listeners for media inputs
desktopPhotoInput.addEventListener('change', e => handleMediaInput(e));
mobilePhotoInput.addEventListener('change', e => handleMediaInput(e));
allDesktopInsideMediaContainer.addEventListener('change', e => handleMediaInput(e));
allMobileInsideMediaContainer.addEventListener('change', e => handleMediaInput(e));

// adding inputs for credits
moreCreditsButton.addEventListener('click', (e) => {
    // Get the value of moreCreditsInput and append that many single-credits divs
    for (let i = 0; i < +moreCreditsInput.value; i++) {
        allCreditsContainer.insertAdjacentHTML('beforeend', htmlSnippets.singleCredits());
    }
})

// removing inputs for credits
allCreditsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('credits-delete')) {
        e.target.parentElement.remove();
    }
});

// adding inputs for desktop inside media
moreDesktopMediaButton.addEventListener('click', (e) => {
    // Get the value of moreDesktopMediaInput and append that many single-desktop-inside-media divs
    for (let i = 0; i < +moreDesktopMediaInput.value; i++) {
        allDesktopInsideMediaContainer.insertAdjacentHTML('beforeend', htmlSnippets.singleDesktopInsideMedia());
    }
})

// removing inputs for desktop inside media
allDesktopInsideMediaContainer.addEventListener('click', e => {
    if(e.target.dataset.file) {
        // console.log(e.target.dataset.file)
        adminShowDialog.deleteImage(addProjectForm.dataset.slug, e.target.dataset.file, e);
        // code to create "Delete File" dialog and then delete file and remove element
    }
    else if (e.target.classList.contains('inside-media-delete')) {
        e.target.parentElement.remove();
    }
});

// adding inputs for mobile inside media
moreMobileMediaButton.addEventListener('click', (e) => {
    // Get the value of moreMobileMediaInput and append that many single-mobile-inside-media divs
    for (let i = 0; i < +moreMobileMediaInput.value; i++) {
        allMobileInsideMediaContainer.insertAdjacentHTML('beforeend', htmlSnippets.singleMobileInsideMedia());
    }
})

// removing inputs for mobile inside media
allMobileInsideMediaContainer.addEventListener('click', e => {
    if(e.target.dataset.file) {
        // console.log(e.target.dataset.file)
        adminShowDialog.deleteImage(addProjectForm.dataset.slug, e.target.dataset.file, e);
        // code to create "Delete File" dialog and then delete file and remove element
    }
    else if (e.target.classList.contains('inside-media-delete')) {
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
    const desktopInsideMediaInputs = document.querySelectorAll('.desktop-inside-media-input');
    desktopInsideMediaInputs.forEach(input => formData.append('single-desktop-inside-media', input.files[0]));
    const mobileInsideMediaInputs = document.querySelectorAll('.mobile-inside-media-input');
    mobileInsideMediaInputs.forEach(input => formData.append('single-mobile-inside-media', input.files[0]));

    // for (var value of formData.values()) {
    //     console.log('fd', value);
    //  }

    // Note that admin dialog also executes the fetch call
    adminShowDialog.submitProject(formData);
})

// listener to remove popup on click
popupBox.addEventListener('click', e => popupBox.classList.add('hidden'));