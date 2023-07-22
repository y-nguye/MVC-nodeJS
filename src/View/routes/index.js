const homeRoute = require('./home'); // Có thể ghi ./home.js do famework express tự hiểu nên có thể ghi tắt
const courseRoute = require('./courses');
const createRoute = require('./createCourse');
const meCourses = require('./meCourses');

function route(app) {
    app.use('/course', courseRoute);
    app.use('/create', createRoute);
    app.use('/me', meCourses);
    app.use('/', homeRoute);
}

// route sẽ được nhận tại index.js chính,
module.exports = route;
