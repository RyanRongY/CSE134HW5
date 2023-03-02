const dialogTemplate = `
  <dialog>
    <form method="dialog">
      <h1></h1>
      <p></p>
      <input type="text" />
      <button type="submit"></button>
      <button type="reset"></button>
    </form>
  </dialog>
`;

export function showDialog(title, message, submitText, cancelText) {
  // Create a new dialog element from the template
  const dialog = document.createElement('template');
  dialog.innerHTML = DOMPurify.sanitize(dialogTemplate);
  const dialogElement = dialog.content.firstElementChild;

  // Set the title and message of the dialog
  dialogElement.querySelector('h1').textContent = title;
  dialogElement.querySelector('p').textContent = message;

  // Set the text of the submit and cancel buttons
  dialogElement.querySelector('button[type="submit"]').textContent = submitText;
  dialogElement.querySelector('button[type="reset"]').textContent = cancelText;

  // Show the dialog
  document.body.append(dialogElement);
  dialogElement.showModal();

  // Return a Promise that resolves with the user input or null
  return new Promise((resolve, reject) => {
    dialogElement.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = dialogElement.querySelector('input').value;
      dialogElement.remove();
      resolve(input);
    });
    dialogElement.querySelector('form').addEventListener('reset', () => {
      dialogElement.remove();
      resolve(null);
    });
  });
}
