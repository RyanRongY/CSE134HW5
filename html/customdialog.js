import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@2.3.1/dist/purify.min.js';

const output = document.querySelector('output');

function showAlert() {
	window.alert('This is an alert message.');
}

function showConfirm() {
	const result = window.confirm('Are you sure?');
	output.textContent = `The value returned by the confirm method is: ${result}`;
}

function showPrompt() {
	const result = window.prompt('Please enter your name:');
	if (result === null) {
		output.textContent = 'User cancelled the prompt.';
	} else if (result.trim() === '') {
		output.textContent = 'User didn\'t enter anything.';
	} else {
		output.textContent = `Hello, ${result.trim()}!`;
	}
}

function showSafePrompt() {
	const result = window.prompt('Please enter your message:');
	if (result === null) {
		output.textContent = 'User cancelled the prompt.';
	} else if (result.trim() === '') {
		output.textContent = 'User didn\'t enter anything.';
	} else {
		// Sanitize user input to guard against XSS attacks
		const safeResult = DOMPurify.sanitize(result.trim());
		// Use tagged template string to render sanitized input
		output.innerHTML = `You entered: ${safeResult}`;
	}
}

document.getElementById('alert-btn').addEventListener('click', showAlert);
document.getElementById('confirm-btn').addEventListener('click', showConfirm);
document.getElementById('prompt-btn').addEventListener('click', showPrompt);
document.getElementById('safe-prompt-btn').addEventListener('click', showSafePrompt);
