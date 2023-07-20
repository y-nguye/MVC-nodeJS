const express = require('express');
const XNXX = express.Router(); // Cấu hình Route được viết tách ra ngoài

// Nhận đối tượng từ file HomeController
const homeController = require('../../Controller/HomeController');

// route "/" ở đây sẽ nối thêm IRL vào "/" bên file index.js(routes)
XNXX.get('/', homeController.index); // Chạy trực tiếp theo router "/"

// index.js (routes-folder) sẽ nhận XNXX
module.exports = XNXX;
