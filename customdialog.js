// create the dialog element
const dialog = document.createElement("dialog");

// create the dialog content
const dialogContent = `
  <form>
    <label for="inputField">Enter your message:</label>
    <br>
    <input type="text" id="inputField">
    <br><br>
    <button type="submit">OK</button>
    <button type="button" onclick="dialog.close()">Cancel</button>
  </form>
`;

// add the content to the dialog element
dialog.innerHTML = dialogContent;

// add the dialog element to the document body
document.body.appendChild(dialog);

// function to open the dialog and handle the form submission
function showDialog() {
  // open the dialog
  dialog.showModal();

  // handle the form submission
  const form = dialog.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputField = form.querySelector("#inputField");
    const input = inputField.value;
    const sanitizedInput = DOMPurify.sanitize(input);
    document.getElementById("output").innerHTML = `Your message is: ${sanitizedInput}`;
    dialog.close();
  });
}
