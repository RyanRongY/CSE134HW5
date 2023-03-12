var count = 0;

const button = document.getElementById("click-counter-button");

function updateLabel() {
  button.innerText = `Clicked ${count} times.`;
}

button.addEventListener("click", function() {
  count++;
  updateLabel();
});

updateLabel();
