const Child = require("../models/child.js");
const Result = require("../models/result.js");
const User = require("../models/user.js");

exports.create = async function(req, res) {
  const { id_game, scor } = req.body.data;

  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const user = await User.findByPk(loggedInUserId);
  const child = await Child.findOne({ where: {id_user: user.id }});

  const result = await Result.create({
    id_game, scor, id_child: child.id, date: new Date()
  }).then(result => result);

  res.status(201).json({ scor: result.scor });
}
