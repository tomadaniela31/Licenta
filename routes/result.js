const express = require('express');
const router = express.Router();

const resultsController = require('../controllers/results_controller.js');

router.post('/results/create', resultsController.create);

module.exports = router;
