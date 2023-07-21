const express = require('express');
const XNXX = express.Router();

const createCourseController = require('../../Controller/CreateCourseController');

// Nối Route trong index.js(routes)
XNXX.post('/store', createCourseController.store);

XNXX.get('/', createCourseController.create);

module.exports = XNXX;
