const express = require('express');
const router = express.Router();

const therapistController = require('../controllers/therapists_controller.js');

router.get('/logoped', therapistController.index);

module.exports = router;
