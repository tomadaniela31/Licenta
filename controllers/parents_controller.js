const Parent = require('../models/parent.js');
const User = require('../models/user.js');

exports.index = async function(req, res) {
  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const user = await User.findByPk(loggedInUserId);
  const parent = await Parent.findOne({ where: {id_user: user.id }});

  const children = await parent.childrenList();
  res.render('parinte', {
    fullname: user.fullname(),
    children,
    phoneNumber: parent.telefon
  });
}

exports.update = async function(req, res) {
  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const user = await User.findByPk(loggedInUserId);
  const parent = await Parent.findOne({ where: {id_user: user.id }});

  parent.update({ telefon: req.body.data.telefon });

  res.status(200).json({});
}
