const generateBtn = document.querySelector('.generate-btn');
const paletteContainer = document.querySelector('.palette-container');

generateBtn.addEventListener('click', generatePalette); //generates a new palette when the button is clicked

document.addEventListener("keydown", function (e) {
  // Prevent page scrolling when space is pressed
  if (e.code === "Space") {
    e.preventDefault();
    generatePalette(); // Generate new palette on spacebar press
  }
});

function generatePalette() { //generates a palette of 5 random colors
    const palette = [];
    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();
        palette.push(color);
    }
    displayPalette(palette);
}

function getRandomColor() { //generates a random hex color code
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function displayPalette(palette) { //colors the boxes and shows the hex code
    const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = palette[index]; 
    const colorDiv = box.querySelector(".color");
    const colorCode = box.querySelector(".color-code");

    colorDiv.style.backgroundColor = color;
    colorCode.textContent = color;
  });
}

paletteContainer.addEventListener("click", function (e) {
    // Click on copy icon
    if (e.target.classList.contains("copy-btn")) {
    const colorCode = e.target.parentElement
            .querySelector(".color-code").textContent;
    navigator.clipboard
      .writeText(colorCode)
      .then(() => showCopySuccess(e.target));
  }

  // Click on color block
  else if (e.target.classList.contains("color")) {
    const box = e.target.nextElementSibling;
    const colorCode = box.querySelector(".color-code").textContent;
    const icon = box.querySelector(".copy-btn");

    navigator.clipboard
      .writeText(colorCode)
      .then(() => showCopySuccess(icon));
  }

  // Click directly on hex code
  else if (e.target.classList.contains("color-code")) {
    const box = e.target.parentElement;
    const icon = box.querySelector(".copy-btn");

    navigator.clipboard
      .writeText(e.target.textContent)
      .then(() => showCopySuccess(icon));
  }
});

function showCopySuccess(element) { //shows check after copying the color code
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}
