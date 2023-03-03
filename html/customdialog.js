// Clone dialog templates and add them to the body
const alertTemplate = document.getElementById('alertTemplate');
const alertDialog = alertTemplate.content.cloneNode(true).querySelector('dialog');
document.body.appendChild(alertDialog);

const confirmTemplate = document.getElementById('confirmTemplate');
const confirmDialog = confirmTemplate.content.cloneNode(true).querySelector('dialog');
document.body.appendChild(confirmDialog);

const promptTemplate = document.getElementById('promptTemplate');
const promptDialog = promptTemplate.content.cloneNode(true).querySelector('dialog');
document.body.appendChild(promptDialog);

const saferPromptTemplate = document.getElementById('saferPromptTemplate');
const saferPromptDialog = saferPromptTemplate.content.cloneNode(true).querySelector('dialog');
document.body.appendChild(saferPromptDialog);

// Get dialog elements and buttons
const alertOkBtn = alertDialog.querySelector('button');
const confirmYesBtn = confirmDialog.querySelector('.confirm-yes');
const confirmNoBtn = confirmDialog.querySelector('.confirm-no');
const promptInput = promptDialog.querySelector('input');
const promptOkBtn = promptDialog.querySelector('.prompt-ok');
const promptCancelBtn = promptDialog.querySelector('.prompt-cancel');
const saferPromptInput = saferPromptDialog.querySelector('input');
const saferPromptOkBtn = saferPromptDialog.querySelector('.safer-prompt-ok');
const saferPromptCancelBtn = saferPromptDialog.querySelector('.safer-prompt-cancel');
const confirmOutput = document.getElementById('confirmOutput');

// Add event listeners to buttons
alertOkBtn.addEventListener('click', () => {
  alertDialog.close();
});

confirmYesBtn.addEventListener('click', () => {
  confirmOutput.textContent = 'The value returned by the confirm method is: true';
  confirmDialog.close();
});

confirmNoBtn.addEventListener('click', () => {
  confirmOutput.textContent = 'The value returned by the confirm method is: false';
  confirmDialog.close();
});

promptOkBtn.addEventListener('click', () => {
  if (promptInput.value === '') {
    confirmOutput.textContent = 'You did not enter anything';
  } else {
    confirmOutput.textContent = `Welcome, ${promptInput.value}`;
  }
  promptInput.value = '';
  promptDialog.close();
});

promptCancelBtn.addEventListener('click', () => {
  confirmOutput.textContent = 'You cancelled';
  promptInput.value = '';
  promptDialog.close();
});

saferPromptOkBtn.addEventListener('click', () => {
  const sanitizedResult = DOMPurify.sanitize(saferPromptInput.value);
  if (sanitizedResult === '') {
    confirmOutput.textContent = 'You did not enter anything';
  } else {
    confirmOutput.textContent = `Welcome, ${sanitizedResult}`;
  }
  saferPromptInput.value = '';
  saferPromptDialog.close();
});

saferPromptCancelBtn.addEventListener('click', () => {
  confirmOutput.textContent = 'You cancelled';
  saferPromptInput.value = '';
  saferPromptDialog.close();
});

// Show dialogs when buttons are clicked
document.getElementById('alertBtn').addEventListener('click', () => {
  alertDialog.showModal();
});

document.getElementById('confirmBtn').addEventListener('click', () => {
  confirmDialog.showModal();
});

document.getElementById('promptBtn').addEventListener('click', () => {
  promptDialog.showModal();
});

document.getElementById('saferPromptBtn').addEventListener('click', () => {
  saferPromptDialog.showModal();
});
