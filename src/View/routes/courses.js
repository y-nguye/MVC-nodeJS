const express = require('express');
const XNXX = express.Router();

const courseController = require('../../Controller/CourseController');

XNXX.post('/form-action', courseController.formAction);
XNXX.post('/:id/force', courseController.force);
XNXX.post('/:id/delete', courseController.destroy);
XNXX.get('/:id/edit', courseController.edit);
XNXX.post('/:id', courseController.update);
XNXX.get('/:slugXXX', courseController.index);

module.exports = XNXX;
