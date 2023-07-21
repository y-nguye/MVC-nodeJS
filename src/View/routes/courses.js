const express = require('express');
const XNXX = express.Router();

const courseController = require('../../Controller/CourseController');

XNXX.get('/:slugXXX', courseController.index);

module.exports = XNXX;
