const Child = require("../models/child.js");
const Parent = require("../models/parent.js");
const Therapist = require("../models/therapist.js");
const User = require("../models/user.js");

exports.index = async function(req, res) {
  // Căutăm user-ul curent în funcție de cookie-ul "user"
  // ex. user=2, 2 este id-ul user-ului
  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie && cookie.length) {
    const userCookie = cookie.split('; ').find(row => row.startsWith('user='))
    loggedInUserId = userCookie ? userCookie.split('=')[1] : null;
  }
  user = await User.findByPk(loggedInUserId);

  // Dacă user-ul curent există atunci este redirecționat
  // către pagina corespunzătoare lui, altfel se face render
  // la pagina de login
  if (user) {
    const redirectTo = await user.mainView();
    res.redirect(redirectTo);
  } else {
    res.render("index");
  }
};

exports.login = async function (req, res) {
  const { email, password } = req.body.data;

  user = await User.findOne({ where: { email, password } });

  if (user) {
    const redirectTo = await user.mainView();
    // status 200 = OK
    res.status(200).json({ redirectTo, id: user.id });
  } else {
    // status 404 = NOT FOUND
    res.status(404).json({
      error: true,
      errorMessage: "User-ul nu există / Parola este greșită ",
    });
  }
};

exports.register = function (req, res) {
  res.render("register");
};

exports.signup = async function (req, res) {
  const { email } = req.body.data;

  // Verificam daca email-ul exista deja
  existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    res.send({
      error: true,
      errorMessage: "Email-ul este deja folosit / User existent",
    });
  } else {
    // Creeam user-ul in db
    await User.create(req.body.data);
    const user = await User.findOne({ where: { email } });

    // Creeam si tipul user-ului respectiv
    switch (user.id_role) {
      case 3:
        Parent.create({ id_user: user.id });
        break;
      case 2:
        Child.create({ id_user: user.id });
        break;
      case 1:
        Therapist.create({ id_user: user.id });
        break;
    }

    const redirectTo = await user.mainView();
    res.send({ success: true, redirectTo, id: user.id });
  }
};
