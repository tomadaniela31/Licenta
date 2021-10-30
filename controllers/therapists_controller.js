const Therapist = require('../models/therapist.js');
const User = require('../models/user.js');

exports.index = async function(req, res) {
  const cookie = req.headers.cookie;
  let loggedInUserId;
  if (cookie) {
    loggedInUserId = cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
  }
  const user = await User.findByPk(loggedInUserId);
  const therapist = await Therapist.findOne({ where: {id_user: user.id }});
  const classrooms = await therapist.classrooms();

  res.render('logoped', {
    fullname: user.fullname(),
    classrooms
  });
}
