const desktopInsideMedia = get('saved-desktop-inside-media');
const mobileInsideMedia  = get('saved-mobile-inside-media');

const sortable = Sortable.create(desktopInsideMedia, { onSort: onSortDesktop, handle: '.preview-image', dragoverBubble: true });
const sortable2 = Sortable.create(mobileInsideMedia, { onSort: onSortMobile, handle: '.preview-image', dragoverBubble: true });

const slug = get('add-project-form').dataset.slug;
const mobileInsideMediaElems = document.querySelectorAll('.single-mobile-inside-media');

async function onSortDesktop() {
    const desktopInsideMediaElems = document.querySelectorAll('.single-desktop-inside-media');
    const newFileOrder = [];
    desktopInsideMediaElems.forEach(elem => {
        // console.log(elem.dataset.file);
        newFileOrder.push(elem.dataset.file)
    })

    // console.log('new file order is', newFileOrder)

    const data = {slug, newFileOrder, procedure: 'desktop'}
    updateOrderFetch(data);
}

async function onSortMobile() {
    const mobileInsideMediaElems = document.querySelectorAll('.single-mobile-inside-media');
    const newFileOrder = [];
    mobileInsideMediaElems.forEach(elem => {
        // console.log(elem.dataset.file);
        newFileOrder.push(elem.dataset.file)
    })

    // console.log('new file order is', newFileOrder)

    const data = {slug, newFileOrder, procedure: 'mobile'}
    updateOrderFetch(data);
}

async function updateOrderFetch(data) {
    let response;
    try {
            response = await fetch('/admin/update-media-order', {
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