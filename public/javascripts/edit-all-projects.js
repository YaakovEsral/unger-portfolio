const deleteProjectDialog = get('all-projects-popup');
const showDeleteDialogButtons = document.querySelectorAll('.show-delete-project-dialog-button');

// When any of the 'Delete this project' buttons are clicked, show dialog to delete
showDeleteDialogButtons.forEach(button => {
    button.addEventListener('click', async e => {
        const response = await fetchUtils.deleteProject(e);
        dialogBoxNoModal.innerHTML = `<p class=${response.responseClass} id="delete-project-response">${response.message}</p>`;
        show(dialogBoxNoModal)
        setTimeout(() => hide(dialogBoxNoModal), response.timeout)
    })
})