

const output = document.getElementById('outputField');

// Alert dialog
const alertBtn = document.getElementById('alertBtn');
const alertTemplate = document.getElementById('alertTemplate');
document.body.appendChild(alertTemplate.content.cloneNode(true));
const alertDialog = document.querySelector('dialog');
const alertMessage = document.getElementById('alertMessage');
const alertYesButton = document.getElementById('alertYesButton');
const alertNoButton = document.getElementById('alertNoButton');
alertBtn.addEventListener('click', () => {
	alertMessage.textContent = 'This is an alert dialog';
	alertDialog.showModal();
});
alertYesButton.addEventListener('click', () => {
	alertDialog.close();
});

// Confirm dialog
const confirmBtn = document.getElementById('confirmBtn');
const confirmTemplate = document.getElementById('confirmTemplate');
document.body.appendChild(confirmTemplate.content.cloneNode(true));
const confirmDialog = document.querySelector('dialog');
const confirmMessage = document.getElementById('confirmMessage');
const confirmYesButton = document.getElementById('confirmYesButton');
const confirmNoButton = document.getElementById('confirmNoButton');
confirmBtn.addEventListener('click', () => {
	confirmMessage.textContent = 'This is a confirm dialog';
	confirmDialog.showModal();
});
confirmYesButton.addEventListener('click', () => {
	confirmDialog.close();
	output.textContent = 'The value returned by the confirm method is: true';
});
confirmNoButton.addEventListener('click', () => {
	confirmDialog.close();
	output.textContent = 'The value returned by the confirm method is: false';
});

// Prompt dialog
const promptBtn = document.getElementById('promptBtn');
const promptTemplate = document.getElementById('promptTemplate');
document.body.appendChild(promptTemplate.content.cloneNode(true));
const promptDialog = document.querySelector('dialog');
const promptMessage = document.getElementById('promptMessage');
const promptInput = document.getElementById('promptInput');
const promptCancelButton = document.getElementById('promptCancelButton');
const promptYesButton = document.getElementById('promptYesButton');
promptBtn.addEventListener('click', () => {
	promptMessage.textContent = 'Please enter your name:';
	promptInput.value = '';
	promptDialog.showModal();
});
promptCancelButton.addEventListener('click', () => {
	promptDialog.close();
	output.textContent = 'User cancelled the prompt';
});
promptYesButton.addEventListener('click', () => {
	const promptValue = promptInput.value.trim();
	if (promptValue === '') {
		output.textContent = 'User didn\'t enter anything';
	} else {
		output.textContent = `Your name is ${promptValue}`;
	}
	promptDialog.close();
});

// Custom dialog
const customBtn = document.getElementById('customBtn');
const customTemplate = document.getElementById('customTemplate');
document.body.appendChild(customTemplate.content.cloneNode(true));
const customDialog = document.querySelector('dialog');
const customTitle = document.getElementById('customTitle');
const customMessage = document.getElementById('customMessage');
const customYesButton = document.getElementById('customYesButton');
const customNoButton = document.getElementById('customNoButton');
customBtn.addEventListener('click', () => {
	customTitle.textContent = 'Custom Dialog';
	customMessage.textContent = 'Do you want to proceed with this action?';
	customDialog.showModal();
});
customYesButton.addEventListener('click', () => {
	customDialog.close();
	output.textContent = 'User clicked Yes';
});
customNoButton.addEventListener('click', () => {
	customDialog.close();
	output.textContent = 'User clicked No';
});

// Sanitize input
DOMPurify.addHook('beforeSanitizeAttributes', (node) => {
	if (node.nodeName === 'TEMPLATE') {
		node.removeAttribute('id');
	}
});
