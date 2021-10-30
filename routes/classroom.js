const express = require('express');
const router = express.Router();

const classroomsController = require('../controllers/classrooms_controller.js');

router.post('/classrooms/create', classroomsController.create);

router.get('/classrooms/:id/show', classroomsController.show);

router.post('/classrooms/:id/update', classroomsController.update);

module.exports = router;
