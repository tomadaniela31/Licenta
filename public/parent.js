import { post } from './requests.js';

document.getElementById('sign-out-btn').addEventListener('click', () => {
  document.cookie = 'user=-1';
  window.location = '/';
});

document.getElementById('add-child-btn').addEventListener('click', () => {
  const childId = document.getElementById('add-child-input').value;
  const parsedChildId = parseInt(childId);

  if (childId != parsedChildId || !(childId && Number.isInteger(parsedChildId))) {
    document.getElementsByClassName('error')[0].innerHTML = 'Cod incorect!';
    return;
  }
  document.getElementsByClassName('error')[0].innerHTML = '';

  post(`/children/${parsedChildId}/update`).then((data) => {
    if (data.error) {
      document.getElementsByClassName('error')[0].innerHTML = 'Cod incorect!';
    } else {
      window.location.reload();
    }
  })
});

document.getElementById('update-phone-btn').addEventListener('click', () => {
  const newPhoneNumber = document.getElementById('update-phone-input').value;

  if (newPhoneNumber.length && RegExp('^[0-9]*$').test(newPhoneNumber)) {
    document.getElementById('phone-number-error').classList.add('d-none');
    post('/parent/update', { data: { telefon: newPhoneNumber } });
  } else {
    document.getElementById('phone-number-error').classList.remove('d-none');
  }
})
