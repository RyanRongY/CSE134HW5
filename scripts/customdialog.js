import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@2.3.1/dist/purify.min.js';

// Get dialog elements
const alertDialog = document.querySelector('#alert-dialog');
const confirmDialog = document.querySelector('#confirm-dialog');
const promptDialog = document.querySelector('#prompt-dialog');
const saferPromptDialog = document.querySelector('#safer-prompt-dialog');

// Get dialog elements for manipulation
const alertDialogText = alertDialog.querySelector('p');
const confirmDialogText = confirmDialog.querySelector('p');
const promptInput = promptDialog.querySelector('#prompt-input');
const saferPromptInput = saferPromptDialog.querySelector('#safer-prompt-input');
const confirmButton = confirmDialog.querySelector('.confirm-button');
const cancelButton = confirmDialog.querySelector('.cancel-button');
const dialogCloseButtons = document.querySelectorAll('.close-button');

// Close all dialogs function
function closeAllDialogs() {
  alertDialog.close();
  confirmDialog.close();
  promptDialog.close();
  saferPromptDialog.close();
}

// Alert function
function customAlert(message) {
  alertDialogText.innerHTML = DOMPurify.sanitize(message);
  alertDialog.showModal();
}

// Confirm function
function customConfirm(message, callback) {
  confirmDialogText.innerHTML = DOMPurify.sanitize(message);
  confirmButton.addEventListener('click', () => {
    callback(true);
    closeAllDialogs();
  });
  cancelButton.addEventListener('click', () => {
    callback(false);
    closeAllDialogs();
  });
  confirmDialog.showModal();
}

// Prompt function
function customPrompt(message, callback) {
  promptInput.value = '';
  promptInput.focus();
  const onSubmit = () => {
    const value = DOMPurify.sanitize(promptInput.value);
    if (value) {
      callback(value);
      closeAllDialogs();
    }
  };
  promptInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  });
  confirmButton.addEventListener('click', onSubmit);
  cancelButton.addEventListener('click', closeAllDialogs);
  promptDialog.showModal();
}

// Safer prompt function
function customSaferPrompt(message, callback) {
  saferPromptInput.value = '';
  saferPromptInput.focus();
  const onSubmit = () => {
    const value = DOMPurify.sanitize(saferPromptInput.value);
    if (value) {
      callback(value);
      closeAllDialogs();
    }
  };
  saferPromptInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  });
  confirmButton.addEventListener('click', onSubmit);
  cancelButton.addEventListener('click', closeAllDialogs);
  saferPromptDialog.showModal();
}

// Attach event listeners to close dialog buttons
for (const closeButton of dialogCloseButtons) {
  closeButton.addEventListener('click', closeAllDialogs);
}

// Export custom dialog functions
export { customAlert, customConfirm, customPrompt, customSaferPrompt };
