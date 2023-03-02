

const alertDialog = document.getElementById("alertDialog");
const alertOkBtn = document.getElementById("alertOkBtn");
const confirmDialog = document.getElementById("confirmDialog");
const confirmYesBtn = document.getElementById("confirmYesBtn");
const confirmNoBtn = document.getElementById("confirmNoBtn");
const promptDialog = document.getElementById("promptDialog");
const promptInput = document.getElementById("promptInput");
const promptOkBtn = document.getElementById("promptOkBtn");
const promptCancelBtn = document.getElementById("promptCancelBtn");
const saferPromptDialog = document.getElementById("saferPromptDialog");
const saferPromptInput = document.getElementById("saferPromptInput");
const saferPromptOkBtn = document.getElementById("saferPromptOkBtn");
const saferPromptCancelBtn = document.getElementById("saferPromptCancelBtn");
const confirmOutput = document.getElementById("confirmOutput");

alertBtn.addEventListener("click", () => {
  alertDialog.showModal();
});

alertOkBtn.addEventListener("click", () => {
  alertDialog.close();
});

confirmBtn.addEventListener("click", () => {
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

promptBtn.addEventListener("click", () => {
  promptDialog.showModal();
});

promptOkBtn.addEventListener("click", () => {
  if (promptInput.value === "") {
    console.log("User didn't enter anything");
  } else {
    console.log(`Hello, ${promptInput.value}!`);
  }
  promptInput.value = "";
  promptDialog.close();
});

promptCancelBtn.addEventListener("click", () => {
  console.log("User cancelled the prompt");
  promptInput.value = "";
  promptDialog.close();
});

saferPromptBtn.addEventListener("click", () => {
  saferPromptDialog.showModal();
});

saferPromptOkBtn.addEventListener("click", () => {
  const sanitizedResult = DOMPurify.sanitize(saferPromptInput.value);
  if (sanitizedResult === "") {
    console.log("User didn't enter anything");
  } else {
    console.log(`Hello, ${sanitizedResult}!`);
  }
  saferPromptInput.value = "";
  saferPromptDialog.close();
});

saferPromptCancelBtn.addEventListener("click", () => {
  console.log("User cancelled the prompt");
  saferPromptInput.value = "";
  saferPromptDialog.close();
});
