import { post } from "../../requests.js";

const colors = [
  'red', 'green', 'yellow', 'orange', 'blue',
  'pink', 'brown', 'cyan', 'purple', 'gold'
]
let colorIndex = 0;

const selected = [];

let lastSelectedCause;

[...document.querySelectorAll('.cause-img')].forEach((causeImg) => {
  causeImg.addEventListener('click', () => {
    if (lastSelectedCause) {
      return;
    }
    causeImg.style.border = `10px solid ${colors[colorIndex]}`;
    const src = causeImg.src;
    const imgId = src.split('/')[src.split('/').length - 1].slice(5,6);
    lastSelectedCause = imgId;
  })
})

console.log('');

[...document.querySelectorAll('.effect-img')].forEach((effectImg) => {
  effectImg.addEventListener('click', () => {
    if (!lastSelectedCause) {
      return;
    }
    const src = effectImg.src;
    const imgId = src.split('/')[src.split('/').length - 1].slice(5,6);
    effectImg.style.border = `10px solid ${colors[colorIndex]}`;

    selected.push({ cause: lastSelectedCause, effect: imgId });

    lastSelectedCause = null;
    colorIndex++;
  })
})


document.getElementById('next-btn').addEventListener('click', () => {
  document.getElementById('level-1').classList.add('d-none');
  document.getElementById('level-2').classList.remove('d-none');
})

document.getElementById('finish-btn').addEventListener('click', () => {
  let scor = 0;

  selected.forEach((selection) => {
    if (selection.cause === selection.effect) {
      scor++;
    }
  })

  post('/results/create', { data: {
    id_game: 3,
    scor
  }}).then((data) => {
    document.getElementById('level-2').classList.add('d-none');
    document.getElementById('obtained-score').classList.remove('display-none');
    document.getElementById('obtained-score').innerHTML = `Ai obținut ${data.scor} puncte.`;
  })
})
