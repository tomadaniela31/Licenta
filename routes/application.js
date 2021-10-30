const express = require('express');
const router = express.Router();

const applicationController = require('../controllers/application_controller.js');

router.get('/', applicationController.index);

router.post('/login', applicationController.login);

router.get('/register', applicationController.register);
router.post('/signup', applicationController.signup);

module.exports = router;
