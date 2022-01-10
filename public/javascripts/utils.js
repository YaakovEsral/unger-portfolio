function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

function toggleShowHide(elem) {
    if (elem.classList.includes('hidden')) {
        elem.classList.remove('hidden');
    } else {
        elem.classList.add('hidden');
    }
}

function get(id) {
    return document.getElementById(id);
}

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

        return response;

    } catch (err) {
        console.error(err);
        return response;
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

        return {message, responseClass: 'success', timeout: 3000};

    } catch (err) {
        console.error(err);
        return {message: err, responseClass: 'failure', timeout: 5000};
    }
}