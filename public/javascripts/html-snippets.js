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
                            <button type="button" id="cancel-delete-image-button">Cancel</button>
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

    function singleCredits() {
        const htmlContent = `
                            <div class="single-credits">
                                <span class="credits-delete">&#10006</span>
                                <input type="text" name="credit-type" placeholder="Credit Type" />
                                <input type="text" name="credit-name" placeholder="Name" />
                            </div>
                            `;
        return htmlContent;
    }

    function singleDesktopInsideMedia(index, url, isFileImage) {
        const htmlContent = isFileImage ? `
                                <div class="single-desktop-inside-media upload-image">
                                    <span class="inside-media-delete delete-uploaded-image" data-index=${index}>Remove Media From Upload</span>
                                    <img class="inside-media-preview preview-image" src=${url}>
                                </div>
                            `: 
                            `
                            <div class="single-desktop-inside-media upload-image">
                                <span class="inside-media-delete delete-uploaded-image" data-index=${index}>Remove Media From Upload</span>
                                <video class="inside-media-preview preview-image" src=${url} controls>
                            </div>
                        `;
        return htmlContent;
    }

    function singleMobileInsideMedia(index, url) {
        const htmlContent = `
                                <div class="single-mobile-inside-media upload-image">
                                    <span class="inside-media-delete delete-uploaded-image" data-index=${index}>Remove Media From Upload</span>
                                    <img class="inside-media-preview preview-image" src=${url}>
                                </div>
                            `;
        return htmlContent;
    }

    window.htmlSnippets = {
        error,
        projectSubmitted,
        deleteImage,
        deleteProject,
        singleCredits,
        singleDesktopInsideMedia,
        singleMobileInsideMedia
    }
})()