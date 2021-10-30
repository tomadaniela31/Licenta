import { post } from "../../requests.js";

const levels = [
  {
    img: '../../images/games/orientation/0.jpg',
    options: [
      'Mașina este în garaj',
      'Mașina este pe drum',
      'Mașina este în parcare',
      'Mașina este la mecanic'
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/orientation/1.jpg',
    options: [
      'Câinii sunt în pat',
      'Câinii sunt în curte',
      'Câinii sunt sub pat',
      'Câinii sunt în cușcă'
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/orientation/2.jpg',
    options: [
      'Pisica este pe scaun',
      'Pisica este pe canapea',
      'Pisica este pe masă',
      'Pisica este pe jos'
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/orientation/3.jpg',
    options: [
      'Cana este pe masă',
      'Cana este pe scaun',
      'Cana este în chiuvetă',
      'Cana este în mână'
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/orientation/4.jpg',
    options: [
      'Câinele este pe lemn',
      'Câinele este lângă lemn',
      'Câinele este în fața lemnului',
      'Câinele este în spatele lemnului'
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/orientation/5.jpg',
    options: [
      'Oamenii sunt lângă șine',
      'Oamenii sunt în tren',
      'Oamenii sunt pe șine',
      'Oamenii sunt lângă tren',
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/orientation/6.jpg',
    options: [
      'Merele sunt în copac',
      'Merele sunt în prăjitură',
      'Merele sunt în coș',
      'Merele sunt în magazin',
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/orientation/7.jpg',
    options: [
      'Ursulețul este pe canapea',
      'Ursulețul este sub canapea',
      'Ursulețul este lângă canapea',
      'Ursulețul este în spatele canapelei'
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/orientation/8.jpg',
    options: [
      'Oamenii sunt în barcă',
      'Oamenii sunt în lac',
      'Oamenii sunt pe mal',
      'Oamenii sunt sub apă',
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/orientation/9.jpg',
    options: [
      'Albina zboară',
      'Albina este pe floare',
      'Albina langă floare',
      'Albina este în stup'
    ],
    correctOptionIndex: 1
  },
];

let score = 0;

const imgElement = document.getElementById('image');
const optionsElement = document.getElementById('options');

let currentLevelIndex = 0;

const drawLevel = () => {
  const currentLevel = levels[currentLevelIndex];
  imgElement.src = currentLevel.img;

  const optionsHtml = currentLevel.options.map((option, index) => `
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="answer" value="${index}">
    <label class="form-check-label" for="${index}">${option}</label>
  </div>
  <br>
  `).join('');
  optionsElement.innerHTML = optionsHtml;
}

drawLevel();

document.getElementById('next-btn').addEventListener('click', () => {
  const currentLevel = levels[currentLevelIndex];
  if (document.querySelector('input[name="answer"]:checked')?.value == currentLevel.correctOptionIndex) {
    score++;
  }

  if (currentLevelIndex === 9) {
    post('/results/create', { data: {
      id_game: 2,
      scor: score
    }}).then((data) => {
      document.getElementById('game-level').classList.add('display-none');
      document.getElementById('obtained-score').classList.remove('display-none');
      document.getElementById('obtained-score').innerHTML = `Ai obținut ${data.scor} puncte.`;
    })
    return;
  }

  console.log({ score });

  currentLevelIndex++;
  drawLevel();
})
