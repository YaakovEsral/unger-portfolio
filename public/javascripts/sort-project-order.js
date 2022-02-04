const element = document.getElementById('all-projects-container');
const sortable = Sortable.create(element, { onSort, dragoverBubble: true });

async function onSort(e) {
    // console.log(e);
    const data = {
        newIndex: e.newIndex,
        oldIndex: e.oldIndex
    }

    let response;

    try {
            response = await fetch('/admin/update-project-order', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.status} - ${message || response.statusText}`)
        }
        return response;
    }
    catch (err) {
        console.error(err);
        return response;
    }
}