import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@2.3.1/dist/purify.min.js';

const output = document.querySelector('output');
const alertDialogTemplate = document.querySelector('#alert-dialog-template');
const confirmDialogTemplate = document.querySelector('#confirm-dialog-template');
const promptDialogTemplate = document.querySelector('#prompt-dialog-template');
const saferPromptDialogTemplate = document.querySelector('#safer-prompt-dialog-template');

function showDialog(dialogTemplate, message, defaultValue, callback) {
  const dialog = dialogTemplate.content.cloneNode(true).querySelector('dialog');
  const dialogMessage = dialog.querySelector('p');
  const dialogInput = dialog.querySelector('input');

  dialogMessage.innerHTML = message;
  dialogInput.value = defaultValue;

  const closeButton = dialog.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    const result = closeButton.getAttribute('data-result');
    if (callback) {
      callback(result === 'true' ? true : result === 'false' ? false : result);
    }
    dialog.close();
  });

  dialog.showModal();
}

export function customAlert(message) {
  showDialog(alertDialogTemplate, message);
}

export function customConfirm(message, callback) {
  showDialog(confirmDialogTemplate, message, null, callback);
}

export function customPrompt(message, callback, defaultValue = '') {
  showDialog(promptDialogTemplate, message, defaultValue, callback);
}

export function customSaferPrompt(message, callback, defaultValue = '') {
  showDialog(saferPromptDialogTemplate, message, defaultValue, (result) => {
    const sanitizedResult = DOMPurify.sanitize(result);
    callback(sanitizedResult);
  });
}

const customAlertBtn = document.querySelector('#custom-alert-btn');
const customConfirmBtn = document.querySelector('#custom-confirm-btn');
const customPromptBtn = document.querySelector('#custom-prompt-btn');
const customSaferPromptBtn = document.querySelector('#custom-safer-prompt-btn');

customAlertBtn.addEventListener('click', () => {
  const message = 'This is a custom alert message.';
  customAlert(message);
});

customConfirmBtn.addEventListener('click', () => {
  const message = 'Are you sure you want to delete this file?';
  customConfirm(message, (result) => {
    output.innerHTML = `The value returned by the confirm method is: ${result}`;
  });
});

customPromptBtn.addEventListener('click', () => {
  const message = 'Please enter your legal name:';
  customPrompt(message, (value) => {
    if (value) {
      output.innerHTML = `Hello, ${value}!`;
    } else {
      output.innerHTML = 'User did not enter anything.';
    }
  });
});

customSaferPromptBtn.addEventListener('click', () => {
  const message = 'What is your nickname?';
  customSaferPrompt(message, (value) => {
    if (value) {
      output.innerHTML = `Your nickname is ${value}.`;
    } else {
      output.innerHTML = 'User did not enter anything.';
    }
  });
});
