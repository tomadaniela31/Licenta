import { post } from "./requests.js";

document.getElementById("sign-out-btn").addEventListener("click", () => {
  document.cookie = "user=-1";
  window.location = "/";
});

document.getElementById("add-classroom-btn").addEventListener("click", () => {
  const name = document.getElementById("add-classroom-input").value;

  if (!name) {
    document.getElementsByClassName("error")[0].innerHTML =
      "Numele este obligatoriu!";
    return;
  }
  document.getElementsByClassName("error")[0].innerHTML = "";

  post(`/classrooms/create`, { data: { name } }).then(() => {
    window.location.reload();
  });
});

[...document.querySelectorAll('.edit-classroom-link')].forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    document.getElementById(`classroom-link-${id}`).classList.add('d-none');
    document.getElementById(`classroom-edit-${id}`).classList.remove('d-none');
    document.getElementById(`edit-${id}`).classList.add('d-none');
    document.getElementById(`save-${id}`).classList.remove('d-none');
  });
});

[...document.querySelectorAll('.save-classroom-link')].forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    const input = document.getElementById(`classroom-edit-${id}`);

    const newTitle = input.value;

    if (newTitle.length === 0) {
      input.classList.add('error');
      input.placeholder = 'Câmp obligatoriu!';
      return;
    }

    post(`/classrooms/${id}/update`, { data: {
      title: newTitle
    }}).then(() => {
      window.location.reload();
    })
  });
});
