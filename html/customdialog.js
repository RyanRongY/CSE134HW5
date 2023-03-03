const alertDialog = document.querySelector("#alertDialog");
const alertOkBtn = document.querySelector("#alertOkBtn");
const confirmDialog = document.querySelector("#confirmDialog");
const confirmYesBtn = document.querySelector("#confirmYesBtn");
const confirmNoBtn = document.querySelector("#confirmNoBtn");
const promptDialog = document.querySelector("#promptDialog");
const promptInput = document.querySelector("#promptInput");
const promptOkBtn = document.querySelector("#promptOkBtn");
const promptCancelBtn = document.querySelector("#promptCancelBtn");
const saferPromptDialog = document.querySelector("#saferPromptDialog");
const saferPromptInput = document.querySelector("#saferPromptInput");
const saferPromptOkBtn = document.querySelector("#saferPromptOkBtn");
const saferPromptCancelBtn = document.querySelector("#saferPromptCancelBtn");
const confirmOutput = document.querySelector("#confirmOutput");


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

saferPromptBtn.addEventListener("click", () => {
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
