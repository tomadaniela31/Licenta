document.getElementById('sign-out-btn').addEventListener('click', () => {
  document.cookie = 'user=-1';
  window.location = '/';
});

document.getElementById('unique-code-btn').addEventListener('click', () => {
  document.getElementById('unique-code-container').classList.remove('d-none');
})
