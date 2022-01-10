const deleteProjectDialog = get('all-projects-popup');
const showDeleteDialogButtons = document.querySelectorAll('#show-delete-project-dialog-button');

// When any of the 'Delete this project' buttons are clicked, show dialog to delete
showDeleteDialogButtons.forEach(button => {
    button.addEventListener('click', showDeleteDialog)
})

// Function to show the delete dialog
function showDeleteDialog(event) {
    // console.log(event);
    // Show delete popup
    deleteProjectDialog.classList.remove('hidden');
    // Set inner content
    deleteProjectDialog.innerHTML = popupHTML.deleteProject();
    // Add listener to hide dialog when "cancel" is clicked
    get('delete-project-cancel').addEventListener('click', () => hide(deleteProjectDialog))
    // Add listener to delete the identified project when the final delete button is clicked
    get('delete-project-button').addEventListener('click', async () => {
        const response = await deleteProject(event);
        deleteProjectDialog.innerHTML = `<p class=${response.responseClass} id="delete-project-response">${response.message}</p>`;
        setTimeout(() => hide(deleteProjectDialog), response.timeout)
    })
}