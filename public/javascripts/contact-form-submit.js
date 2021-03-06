const form = get('contact-form');
const successMessage = get('contact-form-success-message');
const failureMessage = get('contact-form-failure-message');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    // for(var pair of formData.entries()) {
    //     console.log(pair[0]+ ', '+ pair[1]);
    //  }

    const formObject = Object.fromEntries(formData.entries());
    // console.log('obj', formObject);

    const formStringified = JSON.stringify(formObject);
    // console.log('stringified', formStringified);

    let response;

    try {
        response = await fetch("https://formspree.io/f/mjvlyaao", {
            method: 'post',
            body: formStringified,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const parsedResponse = await response.text();
        if (!response.ok) {
            throw new Error(`${response.status} - ${parsedResponse || response.statusText}`);
        }
        // console.log(response, parsedResponse);

        // Display success message
        hide(failureMessage);
        show(successMessage);
        form.reset();
    } catch (err) {
        // Comment out this console log in production
        console.error(err);
        // Display error message
        hide(successMessage);
        show(failureMessage);
    }

})