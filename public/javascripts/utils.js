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