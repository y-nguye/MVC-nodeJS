const homeRoute = require('./home'); // Có thể ghi ./home.js do famework express tự hiểu nên có thể ghi tắt

function route(app) {
    // homeRoute là cấp con nhỏ hơn của "/"
    app.use('/', homeRoute);
}

// route sẽ được nhận tại index.js chính,
// không nhất thiết tên ở hàm xuất này phải giống bên nhận
module.exports = route;
