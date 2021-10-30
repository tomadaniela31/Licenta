import { post } from "../../requests.js";

const levels = [
  {
    img: '../../images/games/rhyme/0_0.png',
    options: [
      '../../images/games/rhyme/0_3.png',
      '../../images/games/rhyme/0_2.png',
      '../../images/games/rhyme/0_1.png',
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/rhyme/1_0.png',
    options: [
      '../../images/games/rhyme/1_2.png',
      '../../images/games/rhyme/1_1.png',
      '../../images/games/rhyme/1_3.png',
    ],
    correctOptionIndex: 1
  },
  {
    img: '../../images/games/rhyme/2_0.png',
    options: [
      '../../images/games/rhyme/2_1.png',
      '../../images/games/rhyme/2_2.png',
      '../../images/games/rhyme/2_3.png',
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/rhyme/3_0.png',
    options: [
      '../../images/games/rhyme/3_3.png',
      '../../images/games/rhyme/3_2.png',
      '../../images/games/rhyme/3_1.png',
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/rhyme/4_0.png',
    options: [
      '../../images/games/rhyme/4_1.png',
      '../../images/games/rhyme/4_2.png',
      '../../images/games/rhyme/4_3.png',
    ],
    correctOptionIndex: 0
  },
];

let score = 0;
let selectedOption = null;

const imgElement = document.getElementById('image');
const optionsElement = document.getElementById('options');

let currentLevelIndex = 0;

const selectOption = (e) => {
  console.log(e.currentTarget);
}

const drawLevel = () => {
  const currentLevel = levels[currentLevelIndex];
  imgElement.src = currentLevel.img;
  optionsElement.innerHTML = '';

  currentLevel.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('col-4');
    const imgEl = document.createElement('img');
    imgEl.src = option;
    imgEl.classList.add('image-option');
    imgEl.addEventListener('click', () => {
      selectedOption = index;
      [...document.querySelectorAll('.image-option')].forEach((img) => {
        img.classList.remove('selected');
      })
      imgEl.classList.add('selected');
    });
    optionElement.appendChild(imgEl);

    optionsElement.appendChild(optionElement);
  })
}

drawLevel();

document.getElementById('next-btn').addEventListener('click', () => {
  const currentLevel = levels[currentLevelIndex];
  console.log(selectedOption)
  if (selectedOption == currentLevel.correctOptionIndex) {
    score+=2;
  }

  if (currentLevelIndex === 4) {
    post('/results/create', { data: {
      id_game: 5,
      scor: score
    }}).then((data) => {
      document.getElementById('game-level').classList.add('display-none');
      document.getElementById('obtained-score').classList.remove('display-none');
      document.getElementById('obtained-score').innerHTML = `Ai obținut ${data.scor} puncte.`;
    })
    return;
  }

  currentLevelIndex++;
  drawLevel();
})
