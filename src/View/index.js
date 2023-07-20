const express = require('express');
const app = express();
const path = require('path');

const route = require('./routes');

const db = require('../Model/config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'resources')));

// Cấu hình Pug
app.set('view engine', 'pug');
// join nhận nhiều đối số, các đối số ở cuối như là path, nó sẽ tự điền dấu '/' vào, thay thế dấu phẩy
app.set('views', path.join(__dirname, 'resources', 'components'));
// Do windows, linux và macos khác nhau path nên cần phải làm vậy, windows thì \\, macos thì /

route(app);

app.listen(3000);
