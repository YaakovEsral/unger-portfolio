(() => {
    const dialogBox = get('admin-popup');

    function deleteProject(event) {
        // console.log(event);

        // Set inner content
        dialogBox.innerHTML = htmlSnippets.deleteProject();

        // Add listener to hide dialog when "cancel" is clicked
        get('delete-project-cancel').addEventListener('click', () => hide(dialogBox))
        // Add listener to delete the identified project when the final delete button is clicked
        get('delete-project-button').addEventListener('click', async () => {
            const response = await fetchUtils.deleteProject(event);
            dialogBox.innerHTML = `<p class=${response.responseClass} id="delete-project-response">${response.message}</p>`;
            setTimeout(() => hide(dialogBox), response.timeout)
        })

        show(dialogBox);
    }

    function deleteImage(slug, file, event) {
        // console.log(slug, file)

        dialogBox.innerHTML = htmlSnippets.deleteImage();
        get('cancel-delete-image-button').addEventListener('click', () => hide(dialogBox));
        get('delete-image-button').addEventListener('click', async () => {
            const response = await fetchUtils.deleteImage(slug, file, event) 
            dialogBox.innerHTML = `<p class=${response.responseClass} id="delete-project-response">${response.message}</p>`;
            setTimeout(() => hide(dialogBox), response.timeout)
        })
        show(dialogBox);
    }

    async function submitProject(formData) {
        let htmlContent = '<p>Submitting project</p>';
        dialogBox.innerHTML = htmlContent;
        show(dialogBox);
        
        const response = await fetchUtils.submitProject(formData);
        htmlContent = response.responseClass === 'success' ? 
                    htmlSnippets.projectSubmitted(response.message) : 
                    htmlSnippets.error(response.message);
        
        dialogBox.innerHTML = htmlContent;

        setTimeout(() => {
            hide(dialogBox);
            response.responseClass === 'success' && window.location.assign('/admin/dashboard')
        }, response.timeout)
    }

    window.adminShowDialog = {
        deleteProject,
        deleteImage,
        submitProject
    }

})()
