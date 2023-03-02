function showCustomDialog(type) {
  const dialog = document.querySelector(`#custom-${type}`);
  const messageElement = dialog.querySelector(`#custom-${type}-message`);
  const inputElement = dialog.querySelector(`#custom-${type}-input`);
  const okButton = dialog.querySelector(`#custom-${type}-ok`);
  const cancelButton = dialog.querySelector(`#custom-${type}-cancel`);
  let inputValue = '';

  if (type === 'alert') {
    messageElement.textContent = 'This is a custom alert message!';
    okButton.addEventListener('click', () => {
      dialog.close();
    });
  } else if (type === 'confirm') {
    messageElement.textContent = 'Do you confirm?';
    okButton.addEventListener('click', () => {
      dialog.returnValue = true;
      dialog.close();
    });
    cancelButton.addEventListener('click', () => {
      dialog.returnValue = false;
      dialog.close();
    });
  } else if (type === 'prompt') {
    messageElement.textContent = 'Please enter something:';
    inputElement.addEventListener('input', () => {
      inputValue = inputElement.value;
    });
    okButton.addEventListener('click', () => {
      dialog.returnValue = inputValue;
      dialog.close();
    });
    cancelButton.addEventListener('click', () => {
      dialog.returnValue = null;
      dialog.close();
    });
  } else if (type === 'safer-prompt') {
    messageElement.textContent = 'Please enter something:';
    inputElement.addEventListener('input', () => {
      inputValue = DOMPurify.sanitize(inputElement.value);
      inputElement.value = inputValue;
    });
    okButton.addEventListener('click', () => {
      dialog.returnValue = inputValue;
      dialog.close();
    });
    cancelButton.addEventListener('click', () => {
      dialog.returnValue = null;
      dialog.close();
    });
  }

  dialog.showModal();
  dialog.addEventListener('close', () => {
    if (dialog.returnValue !== null) {
      if (type === 'alert') {
        window.alert(messageElement.textContent);
      } else if (type === 'confirm') {
        const confirmOutput = document.querySelector('#confirm-output');
        if (confirmOutput) {
          confirmOutput.textContent = `The value returned by the confirm method is: ${dialog.returnValue ? 'Yes' : 'No'}`;
        }
      } else if (type === 'prompt') {
        if (dialog.returnValue) {
          const successMessage = `You entered: ${dialog.returnValue}`;
          window.alert(successMessage);
        } else {
          const failureMessage = 'User didn’t enter anything';
          window.alert(failureMessage);
        }
      } else if (type === 'safer-prompt') {
        if (dialog.returnValue) {
          const successMessage = `You entered: ${dialog.returnValue}`;
          window.alert(successMessage);
        } else {
          const failureMessage = 'User didn’t enter anything';
          window.alert(failureMessage);
        }
      }
    }
  });
}

export { showCustomDialog };
