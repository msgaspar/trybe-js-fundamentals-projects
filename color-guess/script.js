const colorCodeElement = document.getElementById('rgb-color');
const colorOptionsContainerElement = document.getElementById('color-options');
const messageElement = document.getElementById('answer');
const resetButton = document.getElementById('reset-game');
const scoreElement = document.getElementById('score');

let score = 0;

function randomRGBNumber() {
  return Math.floor(Math.random() * 256);
}

function generateRandomRGBColor() {
  const randomR = randomRGBNumber();
  const randomG = randomRGBNumber();
  const randomB = randomRGBNumber();
  return `(${randomR}, ${randomG}, ${randomB})`;
}

function pickColor(event) {
  if (messageElement.textContent === 'Acertou!') {
    return;
  }
  const selectedOption = event.target;
  const selectedColor = selectedOption.style.backgroundColor;
  const correctColor = `rgb${colorCodeElement.textContent}`;
  if (selectedColor === correctColor) {
    messageElement.textContent = 'Acertou!';
    score += 3;
    scoreElement.textContent = `Placar: ${score}`;
  } else {
    messageElement.textContent = 'Errou! Tente novamente!';
  }
}

function generateColorOptions() {
  const numberOfOptions = 6;
  const correctGuessIndex = Math.floor(Math.random() * numberOfOptions);
  for (let index = 0; index < numberOfOptions; index += 1) {
    const element = document.createElement('div');
    element.classList.add('ball');
    element.addEventListener('click', pickColor);
    if (index === correctGuessIndex) {
      element.style.backgroundColor = `rgb${colorCodeElement.textContent}`;
    } else {
      element.style.backgroundColor = `rgb${generateRandomRGBColor()}`;
    }
    colorOptionsContainerElement.appendChild(element);
  }
}

function resetGame() {
  colorCodeElement.textContent = generateRandomRGBColor();
  colorOptionsContainerElement.innerHTML = '';
  generateColorOptions();
  messageElement.textContent = 'Escolha uma cor';
}

colorCodeElement.textContent = generateRandomRGBColor();
scoreElement.textContent = `Placar: ${score}`;
generateColorOptions();
resetButton.addEventListener('click', resetGame);
