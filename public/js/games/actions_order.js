import { post } from "../../requests.js";

const allowDrop = (e) => {
  e.preventDefault();
}

let draggedEl;
let lastOptionId = -1;
let numberOfTries = 0;

const drag = (e) => {
  draggedEl = e.target;
  e.dataTransfer.setData("text", e.target.innerText);
  e.dataTransfer.setData("id", draggedEl.dataset.id);
}

const drop = (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const id = parseInt(e.dataTransfer.getData('id'));
  numberOfTries++;
  if (id === lastOptionId + 1) {
    draggedEl.classList.add('d-none');
    const option = document.createElement('div');
    option.innerHTML = data;
    document.getElementById('droppable').appendChild(option);
    lastOptionId = id;
    document.querySelectorAll('.error')[0].classList.add('d-none');
  } else {
    document.querySelectorAll('.error')[0].classList.remove('d-none');
  }
  if (id === 9) {
    document.getElementById('finish-btn').classList.remove('disabled');
  }
}

const draggableElements = [...document.querySelectorAll('.draggable')];

draggableElements.forEach((el) => {
  el.addEventListener('dragstart', drag);
})

document.getElementById('droppable').addEventListener('drop', drop);
document.getElementById('droppable').addEventListener('dragover', allowDrop);

document.getElementById('finish-btn').addEventListener('click', () => {
  post('/results/create', { data: {
    id_game: 6,
    scor: parseInt(100 / numberOfTries)
  }}).then((data) => {
    document.getElementById('game-level').classList.add('display-none');
    document.getElementById('obtained-score').classList.remove('display-none');
    document.getElementById('obtained-score').innerHTML = `Ai obținut ${data.scor} puncte.`;
  })
})
