(() => {

    const SUCCESS_TIMEOUT = 3000;
    const FAILURE_TIMEOUT = 5000;

    async function deleteImage(slug, file, event) {
        console.log('deleting', slug, file);

        let response;

        try {
            response = await fetch('/admin/delete-image', {
                method: 'delete',
                body: JSON.stringify({ slug, file }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const message = await response.text();
            if (!response.ok) {
                throw new Error(`${response.status} - ${message || response.statusText}`);
            }
            console.log(response, message);

            // If delete worked, remove element
            event.target.parentElement.remove();

            return { message, responseClass: 'success', timeout: SUCCESS_TIMEOUT };

        } catch (err) {
            console.error(err);
            return { message: err, responseClass: 'failure', timeout: FAILURE_TIMEOUT };
        }

    }

    async function deleteProject(event) {
        const id = event.target.dataset.id;
        const slug = event.target.dataset.slug;
        // console.log('deleting project with id of', id);

        let response;

        try {
            response = await fetch('/admin/delete-project', {
                method: 'delete',
                body: JSON.stringify({ id, slug }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const message = await response.text();
            if (!response.ok) {
                throw new Error(`${response.status} - ${message || response.statusText}`);
            }
            console.log(response, message);

            // Remove project from the DOM (grandparent element of the button)
            event.target.parentElement.parentElement.remove();

            return { message, responseClass: 'success', timeout: SUCCESS_TIMEOUT };

        } catch (err) {
            console.error(err);
            return { message: err, responseClass: 'failure', timeout: FAILURE_TIMEOUT };
        }
    }

    async function submitProject(formData) {
        
        let response;

        try {
            // Note that default format is multipart
            response = await fetch('/admin/add-project', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || response.statusText);
            }
            const slug = await response.text();
            console.log(response);
            return { message: slug, responseClass: 'success', timeout: SUCCESS_TIMEOUT };
        } catch (err) {
            console.error(err);
            return { message: err, responseClass: 'failure', timeout: FAILURE_TIMEOUT };
        }

    }

    window.deleteFetchUtils = {
        deleteImage,
        deleteProject,
        submitProject
    }
})()

