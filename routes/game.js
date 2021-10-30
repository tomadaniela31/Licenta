const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games_controller.js');

router.get('/game/:id', gamesController.show);

module.exports = router;
