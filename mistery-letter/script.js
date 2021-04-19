const inputElement = document.getElementById('carta-texto');
const letterElement = document.getElementById('carta-gerada');
const createLetterButton = document.getElementById('criar-carta');
const wordCountElement = document.getElementById('carta-contador');

const classes = {
  style: ['newspaper', 'magazine1', 'magazine2'],
  size: ['medium', 'big', 'reallybig'],
  rotation: ['rotateleft', 'rotateright'],
  skew: ['skewleft', 'skewright'],
};

function pickRandomClasses() {
  const group1 = Object.keys(classes)[Math.floor(Math.random() * Object.keys(classes).length)];
  const group2 = Object.keys(classes)[Math.floor(Math.random() * Object.keys(classes).length)];
  const class1 = classes[group1][Math.floor(Math.random() * classes[group1].length)];
  const class2 = classes[group2][Math.floor(Math.random() * classes[group2].length)];
  return `${class1} ${class2}`;
}

function createLetter() {
  const inputText = inputElement.value;
  if (inputText.trim() === '') {
    letterElement.innerHTML = 'Por favor, digite o conteúdo da carta.';
  } else {
    const letter = inputText.trim().split(' ').map((word) => {
      const randomClasses = pickRandomClasses();
      return `<span class="${randomClasses}">${word}</span>`;
    });
    wordCountElement.textContent = `Sua carta tem ${letter.length} palavras`;
    letterElement.innerHTML = letter.join(' ');
  }
}

function changeClasses(event) {
  const word = event.target;
  if (word.tagName === 'SPAN') {
    word.className = pickRandomClasses();
  }
}

createLetterButton.addEventListener('click', createLetter);
inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') createLetterButton.click();
});
letterElement.addEventListener('click', changeClasses);
