const template = document.querySelector("template");
const alertDialog = template.content.querySelector("#alertDialog");
const alertOkBtn = template.content.querySelector("#alertOkBtn");
const confirmDialog = template.content.querySelector("#confirmDialog");
const confirmYesBtn = template.content.querySelector("#confirmYesBtn");
const confirmNoBtn = template.content.querySelector("#confirmNoBtn");
const promptDialog = template.content.querySelector("#promptDialog");
const promptInput = template.content.querySelector("#promptInput");
const promptOkBtn = template.content.querySelector("#promptOkBtn");
const promptCancelBtn = template.content.querySelector("#promptCancelBtn");
const saferPromptDialog = template.content.querySelector("#saferPromptDialog");
const saferPromptInput = template.content.querySelector("#saferPromptInput");
const saferPromptOkBtn = template.content.querySelector("#saferPromptOkBtn");
const saferPromptCancelBtn = template.content.querySelector("#saferPromptCancelBtn");
const confirmOutput = document.getElementById("confirmOutput");

document.body.appendChild(template.content.cloneNode(true));

document.getElementById("alertBtn").addEventListener("click", () => {
  alertDialog.showModal();
});

alertOkBtn.addEventListener("click", () => {
  alertDialog.close();
});

document.getElementById("confirmBtn").addEventListener("click", () => {
  confirmDialog.showModal();
});

confirmYesBtn.addEventListener("click", () => {
  confirmOutput.textContent = "The value returned by the confirm method is: true";
  confirmDialog.close();
});

confirmNoBtn.addEventListener("click", () => {
  confirmOutput.textContent = "The value returned by the confirm method is: false";
  confirmDialog.close();
});

document.getElementById("promptBtn").addEventListener("click", () => {
  promptDialog.showModal();
});

promptOkBtn.addEventListener("click", () => {
  if (promptInput.value === "") {
    confirmOutput.textContent = "You did not enter anything";

  } else {
    confirmOutput.textContent= `Welcome, ${promptInput.value}`;
  }
  promptInput.value = "";
  promptDialog.close();
});

promptCancelBtn.addEventListener("click", () => {
  confirmOutput.textContent = "You cancelled";
  promptInput.value = "";
  promptDialog.close();
});

document.getElementById("saferPromptBtn").addEventListener("click", () => {
  saferPromptDialog.showModal();
});

saferPromptOkBtn.addEventListener("click", () => {
  const sanitizedResult = DOMPurify.sanitize(saferPromptInput.value);
  if (sanitizedResult === "") {
    confirmOutput.textContent = "You did not enter anything";
  } else {
    confirmOutput.textContent= `Welcome, ${sanitizedResult}`;
  }
  saferPromptInput.value = "";
  saferPromptDialog.close();
});

saferPromptCancelBtn.addEventListener("click", () => {
  confirmOutput.textContent = "You cancelled";
  saferPromptInput.value = "";
  saferPromptDialog.close();
});
