import { post } from "../../requests.js";

const levels = [
  {
    img: '../../images/games/attention/0.jpg',
    options: [
      'Fetița culege flori',
      'Băiatul culege flori',
      'Fetele culeg flori',
      'Băieții culeg flori',
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/attention/1.jpg',
    options: [
      'Fetița joacă fotbal',
      'Băiatul joacă fotbal',
      'Fetele joacă fotbal',
      'Băieții joacă fotbal',
    ],
    correctOptionIndex: 3
  },
  {
    img: '../../images/games/attention/2.jpg',
    options: [
      'Pisica este pe plajă',
      'Câinele este pe plajă',
      'Calul este pe plajă',
      'Elefantul este pe plajă',
    ],
    correctOptionIndex: 1
  },
  {
    img: '../../images/games/attention/3.jpg',
    options: [
      'Fetița aprinde lampionul',
      'Femeia aprinde lampionul',
      'Băiatul aprinde lampionul',
      'Bărbatul aprinde lampionul'
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/attention/4.jpg',
    options: [
      'Fata are o jachetă albastră',
      'Fata are o jachetă roșie',
      'Fata are o jachetă galbenă',
      'Fata are o jachetă verde'
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/attention/5.jpg',
    options: [
      'A venit primăvara',
      'A venit vara',
      'A venit toamna',
      'A venit iarna'
    ],
    correctOptionIndex: 3
  },
  {
    img: '../../images/games/attention/6.jpg',
    options: [
      'Mașina este portocalie',
      'Mașina este neagră',
      'Mașina este roz',
      'Mașina este maro',
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/attention/7.jpg',
    options: [
      'Copilul mânâncă un măr',
      'Copilul mânâncă struguri',
      'Copilul mânâncă pepene verde',
      'Copilul mânâncă o pară'
    ],
    correctOptionIndex: 2
  },
  {
    img: '../../images/games/attention/8.jpg',
    options: [
      'Copiii sunt fericiți',
      'Copilul sunt supărați',
      'Copilul sunt speriați',
      'Copilul sunt îngrijorați'
    ],
    correctOptionIndex: 0
  },
  {
    img: '../../images/games/attention/9.jpg',
    options: [
      'Femeia desenează',
      'Femeia pictează',
      'Femeia scrie',
      'Femeia citește'
    ],
    correctOptionIndex: 2
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
      id_game: 1,
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
