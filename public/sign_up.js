import { post } from './requests.js';

document.getElementById('form-btn').addEventListener('click', () => {
  // In data salvam valorile introduse sub forma necesara pentru baza de date
  const data = getFormData();
  const passwordConfirm = document.getElementById('password-confirm-input').value;

  if (data.password !== passwordConfirm) {
    showError("Parolele nu coincid!")
    return;
  }

  if (!isDataValid(data)) {
    showError("Toate câmpurile sunt obligatorii!");
    return;
  }

  showError(''); // Remove the error if everything passed

  post('signup', { data }).then((data) => {
    if (data.error) {
      showError(data.errorMessage);
    } else {
      document.cookie = `user=${data.id}`;
      window.location = data.redirectTo;
    }
  })
});

const showError = (message) => {
  document.getElementsByClassName('error')[0].innerHTML = message;
}

const isDataValid = (data) => {
  let valid = true;

  Object.keys(data).forEach(key => {
    if (!data[key]) {
      valid = false;
    }
  })

  return valid;
}

const getFormData = () => {
  return {
    email: document.getElementById('email-input').value,
    firstName: document.getElementById('firstname-input').value,
    lastName: document.getElementById('lastname-input').value,
    password: document.getElementById('password-input').value,
    id_role: document.querySelector('input[name="role"]:checked')?.value
  }
}
