const homeRoute = require('./home'); // Có thể ghi ./home.js do famework express tự hiểu nên có thể ghi tắt
const courseRoute = require('./courses');
const createRoute = require('./createCourse');

function route(app) {
    app.use('/course', courseRoute);
    app.use('/create', createRoute);
    app.use('/', homeRoute);
}

// route sẽ được nhận tại index.js chính,
// không nhất thiết tên ở hàm xuất này phải giống bên nhận
module.exports = route;
