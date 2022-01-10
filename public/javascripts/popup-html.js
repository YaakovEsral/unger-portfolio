(() => {

    function error(err) {
        const header = '<h1>Error</h1>'
        const info = `<p class="error-message">${err.message}</p>`;
        const htmlContent = header + info;
        return htmlContent;
    }

    function projectSubmitted(slug) {
        const header = '<h1>Project Submitted</h1>';
        const info = `
                        <p><a href="/portfolio/${slug}" target="_blank">Click here</a> to view your project</p>.
                        <p>Redirecting you momentarily...</p>
                     `
        const htmlContent = header + info;
        return htmlContent;
    }

    function deleteImage() {
        const header = '<h1>Delete Image</h1>';
        const info = `
                        <p>Are you sure you would like to delete this image from your project?</p>
                        <div>
                            <button type="button" id="delete-image-button">Delete</button>
                            <button type="button">Cancel</button>
                        </div>
                     `;
        const htmlContent = header + info;

        return htmlContent;
    }

    function deleteProject() {
        const header = '<h1>Delete Project</h1>';
        const info = `
                        <p>Are you sure you would like to delete this project?</p>
                        <div>
                            <button type="button" id="delete-project-button">Delete</button>
                            <button type="button" id="delete-project-cancel">Cancel</button>
                        </div>
                     `;
        const htmlContent = header + info;

        return htmlContent;
    }

    window.popupHTML = {
        error,
        projectSubmitted,
        deleteImage,
        deleteProject
    }
})()