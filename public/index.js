import { post } from './requests.js';

document.getElementById('form-btn').addEventListener('click', () => {
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const data = { email, password };

  post('login', { data }).then((data) => {
    if (data.error) {
      document.getElementsByClassName('error')[0].innerHTML = data.errorMessage;
    } else {
      document.cookie = `user=${data.id}`;
      window.location = data.redirectTo;
    }
  })
});
