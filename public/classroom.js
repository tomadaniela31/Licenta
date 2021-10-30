import { post } from './requests.js';

document.getElementById('add-child-btn').addEventListener('click', () => {
  const childId = document.getElementById('add-child-input').value;
  const parsedChildId = parseInt(childId);

  if (childId != parsedChildId || !(childId && Number.isInteger(parsedChildId))) {
    document.getElementsByClassName('error')[0].innerHTML = 'Cod incorect!';
    return;
  }
  document.getElementsByClassName('error')[0].innerHTML = '';
  const classRoomId = document.getElementById("classroom-id").dataset.id;
  post(`/children/${parsedChildId}/update`, { data: { id_class: classRoomId }}).then((data) => {
    if (data.error) {
      document.getElementsByClassName('error')[0].innerHTML = 'Cod incorect!';
    } else {
      window.location.reload();
    }
  })
});

[...document.querySelectorAll('#remove-child-btn')].forEach((btn) => {
  btn.addEventListener('click', (e) => {
    post(`/children/${e.currentTarget.dataset.id}/remove_from_class`).then((data) => {
      window.location.reload();
    })
  });
})
