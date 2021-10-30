const Child = require("../models/child");
const Game = require("../models/game");
const Parent = require("../models/parent");
const User = require("../models/user");

// Folosit pentru a adauga id_parent sau id_class la un Child ( de pe parinte respectiv logoped)
exports.update = async function(req, res) {
  // Cautam user-ul curent
  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const user = await User.findByPk(loggedInUserId);

  const child = await Child.findByPk(req.params.id);

  if (child) {
    // Cazul in care adaugam un copil intr-o clasa, primim id_class de pe frontend
    if (req.body.data && req.body.data.id_class) {
      if (!child.id_class) {
        child.update({ id_class: req.body.data.id_class })
        res.status(200).json({});
      }
    // Cazul in care un parinte adauga un copil in lista lui de copii
    } else {
      if (!child.id_parent) {
        const parent = await Parent.findOne({ where: {id_user: user.id }});
        child.update({ id_parent: parent.id })
        res.status(200).json({});
      }
    }
  } else {
    res.status(404).json({ error: true })
  }
}

exports.index = async function(req, res) {  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const user = await User.findByPk(loggedInUserId);
  const child = await Child.findOne({ where: {id_user: user.id }});
  
  res.render('pacient' , {
    // Id-ul il afisam pe pagina copilului ca si codul unic
    id: child.id
  });
}

exports.results = async function(req, res) {
  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const currentUser = await User.findByPk(loggedInUserId);

  const child = await Child.findByPk(req.params.id);
  const games = await Game.findAll();

  // Daca esti parinte te duce pe pagina principala a parintelui ( lista de copii)
  let backButtonLink = '/';
  // Daca esti logoped te duce pe pagina clasei din care face parte copilul
  if (currentUser.id_role == 1) {
    backButtonLink = `/classrooms/${child.id_class}/show`;
  }

  // Promise.all => asteptam ca await-urile din "map" sa fie gata
  const childResults = await Promise.all(games.map(async function (game) {
    const childResultsForGame = await child.resultsFor(game.id);

    return {
      name: game.name,
      scores: childResultsForGame,
    };
  }));

  const parent = await Parent.findByPk(child.id_parent);

  let parentPhone = '';
  if (currentUser.id_role == 1 && parent && parent.telefon) {
    parentPhone = parent.telefon;
  }

  const childFullname = await child.fullname();

  res.render('results', {
    games: childResults,
    childFullname,
    backButtonLink,
    parentPhone
  })
}

exports.removeClass = async function(req, res) {
  const child = await Child.findByPk(req.params.id);
  child.update({ id_class: null });

  res.status(200).json({});
};
