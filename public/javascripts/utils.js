function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

function fadeShow(elem) {
    elem.classList.remove('hidden-fade');
}

function fadeHide(elem) {
    elem.classList.add('hidden-fade');
}

function widthShow(elem) {
    elem.classList.remove('no-width');
}

function widthHide(elem) {
    elem.classList.add('no-width');
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

function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}