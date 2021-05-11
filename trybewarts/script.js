const loginEmailInput = document.getElementById('login-email-input');
const loginPasswordInput = document.getElementById('login-password-input');
const loginButton = document.getElementById('login-button');
const formElement = document.getElementById('evaluation-form');
const formFirstNameInput = document.getElementById('input-name');
const formLastNameInput = document.getElementById('input-lastname');
const formEmailInput = document.getElementById('input-email');
const formHouseInput = document.getElementById('house');
const submitButton = document.getElementById('submit-btn');
const checkAgreement = document.getElementById('agreement');
const commentTextArea = document.getElementById('textarea');
const counterElement = document.getElementById('counter');

function login() {
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;
  if (email === 'tryber@teste.com' && password === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}

function updateCounter() {
  const commentLength = commentTextArea.value.length;
  counterElement.textContent = 500 - commentLength;
}

function readValues() {
  const name = formFirstNameInput.value;
  const lastName = formLastNameInput.value;
  const email = formEmailInput.value;
  const house = formHouseInput.value;
  const family = document.querySelector('input[name="family"]:checked').value;
  const contentElements = document.querySelectorAll('input.subject:checked');
  const rate = document.querySelector('input[name="rate"]:checked').value;
  const comment = commentTextArea.value;

  const contentValues = [];
  for (let index = 0; index < contentElements.length; index += 1) {
    contentValues[index] = contentElements[index].value;
  }
  const contents = contentValues.join(', ');

  return { name, lastName, email, house, family, contents, rate, comment };
}

function createTextElements() {
  const values = readValues();

  const nameText = document.createElement('p');
  nameText.textContent = `Nome: ${values.name} ${values.lastName}`;

  const emailText = document.createElement('p');
  emailText.textContent = `Email: ${values.email}`;

  const houseText = document.createElement('p');
  houseText.textContent = `Casa: ${values.house}`;

  const familyText = document.createElement('p');
  familyText.textContent = `Família: ${values.family}`;

  const subjectsText = document.createElement('p');
  subjectsText.textContent = `Matérias: ${values.contents}`;

  const rateText = document.createElement('p');
  rateText.textContent = `Avaliação: ${values.rate}`;

  const commentText = document.createElement('p');
  commentText.textContent = `Observações: ${values.comment}`;

  return [nameText, emailText, houseText, familyText, subjectsText, rateText, commentText];
}

function submitForm(event) {
  event.preventDefault();
  const elements = createTextElements();
  formElement.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = 'Obrigado por enviar seu formulário!';
  title.classList.add('after-submit');
  formElement.appendChild(title);
  for (let index = 0; index < elements.length; index += 1) {
    formElement.appendChild(elements[index]);
  }
}

loginButton.addEventListener('click', login);
commentTextArea.addEventListener('keyup', updateCounter);
submitButton.addEventListener('click', submitForm);

function disableSubmitButton() {
  checkAgreement.addEventListener('click', () => {
    if (submitButton.disabled) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });
}
disableSubmitButton();
