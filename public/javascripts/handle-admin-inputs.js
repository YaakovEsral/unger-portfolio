/* This file contains handler functions for the inputs on the admin side. */

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

function handleCoverPhotoInput(event) {
    // console.log(event.target.parentElement.children[1]);
    const previewImage = event.target.parentElement.children[1];
    // const previewImage = event.target.parentElement.children[/preview/]); // regex for containing "preview" in ID
    const url = URL.createObjectURL(event.target.files[0]);
    previewImage.src = url;
}

function handleInsideMediaInput(event) {
    // console.log(event);
    // console.log(event.target.id.includes('desktop'))

    // Determine if it's desktop or mobile from event
    const fileInput = event.target;
    const fileArray = event.target.id.includes('desktop') ? desktopInsideMediaFiles : mobileInsideMediaFiles;
    const generateHTML = event.target.id.includes('desktop') ? htmlSnippets.singleDesktopInsideMedia : htmlSnippets.singleMobileInsideMedia;
    const mediaContainer = event.target.id.includes('desktop') ? allDesktopInsideMediaContainer : allMobileInsideMediaContainer ;

    // Add to the appropriate array
    for (let i = 0, files = fileInput.files; i < files.length; i++) {
        files[i].index = i;
        fileArray.push(files[i]);
        // console.log(fileArray[i].name, fileArray[i].index);
        const url = URL.createObjectURL(files[i]);
        const header = '<h4>New Media</h4>';
        const element = generateHTML(i, url);
        const htmlContent = header + element;
        mediaContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
}