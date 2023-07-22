const express = require('express');
const app = express();
const path = require('path');

const route = require('./routes');

const db = require('../Model/config/db');
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'resources')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'resources', 'components'));

route(app);

app.listen(3000);
