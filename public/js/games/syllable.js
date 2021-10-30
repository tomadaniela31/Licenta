import { post } from "../../requests.js";

const levels = [
 { img: '../../images/games/syllable/0_0.png', correctAnswer: 'pat' },
 { img: '../../images/games/syllable/0_1.png', correctAnswer: 'mar' },
 { img: '../../images/games/syllable/0_2.png', correctAnswer: 'tren' },
 { img: '../../images/games/syllable/1_0.png', correctAnswer: 'pa-na' },
 { img: '../../images/games/syllable/1_1.png', correctAnswer: 'ca-na' },
 { img: '../../images/games/syllable/1_2.png', correctAnswer: 'soa-re' },
 { img: '../../images/games/syllable/2_0.png', correctAnswer: 'pier-si-ca' },
 { img: '../../images/games/syllable/2_1.png', correctAnswer: 'flu-tu-re' },
 { img: '../../images/games/syllable/2_2.png', correctAnswer: 'pi-si-ca' },
];

const imgElement = document.getElementById('image');
let currentLevelIndex = 0;

const drawLevel = () => {
  const currentLevel = levels[currentLevelIndex];
  imgElement.src = currentLevel.img;
  document.getElementById('answer-input').value = '';
}

drawLevel();

let score = 1;

document.getElementById('next-btn').addEventListener('click', () => {
  const currentLevel = levels[currentLevelIndex];
  if (document.getElementById('answer-input').value == currentLevel.correctAnswer) {
    score++;
  }

  if (currentLevelIndex === 8) {
    post('/results/create', { data: {
      id_game: 4,
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
