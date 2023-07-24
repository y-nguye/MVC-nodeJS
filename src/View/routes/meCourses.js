const express = require('express');
const XNXX = express.Router();

const meController = require('../../Controller/MeController');

// Nối Route trong index.js(routes)
XNXX.post('/trash/:id/restore', meController.restore);
XNXX.get('/trash', meController.myTrash);
XNXX.get('/', meController.myCourse);

module.exports = XNXX;
