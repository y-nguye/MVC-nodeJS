const express = require('express');
const XNXX = express.Router();

const meController = require('../../Controller/MeController');

// Nối Route trong index.js(routes)
XNXX.get('/', meController.myCourse);

module.exports = XNXX;
