const deleteProjectDialog = get('all-projects-popup');
const showDeleteDialogButtons = document.querySelectorAll('.show-delete-project-dialog-button');

// When any of the 'Delete this project' buttons are clicked, show dialog to delete
showDeleteDialogButtons.forEach(button => {
    button.addEventListener('click', adminShowDialog.deleteProject)
})