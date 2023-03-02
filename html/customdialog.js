function showAlert() {
	window.alert('This is an alert message!');
  }
  
  function showConfirm() {
	const result = window.confirm('Do you confirm?');
	const confirmOutput = document.querySelector('#confirm-output');
	if (confirmOutput) {
	  confirmOutput.textContent = `The value returned by the confirm method is: ${result}`;
	}
  }
  
  function showPrompt() {
	const input = window.prompt('Please enter something:');
	if (input) {
	  window.alert(`You entered: ${input}`);
	} else {
	  window.alert('User didn’t enter anything');
	}
  }
  
  function showSaferPrompt() {
	const input = window.prompt('Please enter something:');
	const safeInput = DOMPurify.sanitize(input);
	if (safeInput) {
	  window.alert(`You entered: ${safeInput}`);
	} else {
	  window.alert('User didn’t enter anything');
	}
  }
  