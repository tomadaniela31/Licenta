const Classroom = require("../models/classroom");
const Therapist = require("../models/therapist");
const User = require("../models/user");

exports.create = async function(req, res) {
  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const user = await User.findByPk(loggedInUserId);
  const therapist = await Therapist.findOne({ where: {id_user: user.id }});

  await Classroom.create({ name: req.body.data.name, id_therapist: therapist.id });

  // 201 = CREATED
  res.status(201).json({});
}

exports.show = async function(req, res) {
  const classroom = await Classroom.findByPk(req.params.id);
  const children = await classroom.childrenList();
  res.render('classroom', {
    id: classroom.id,
    name: classroom.name,
    children
  })
}

exports.update = async function(req, res) {
  const classroom = await Classroom.findByPk(req.params.id);
  classroom.update({ name: req.body.data.title });

  res.status(200).json({});
}
