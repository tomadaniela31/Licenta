const express = require('express');
const router = express.Router();

const parentController = require('../controllers/parents_controller.js');

router.get('/parinte', parentController.index);

router.post('/parent/update', parentController.update);

module.exports = router;
