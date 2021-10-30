const express = require('express');
const router = express.Router();

const childrenController = require('../controllers/children_controller.js');

router.post('/children/:id/update', childrenController.update);

router.get('/pacient', childrenController.index);

router.get('/children/:id/results', childrenController.results);

router.post('/children/:id/remove_from_class', childrenController.removeClass);

module.exports = router;
