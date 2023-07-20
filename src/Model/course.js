const mongoose = require('mongoose');

// Defining a Model

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: 'Mặc định khi dữ liệu trống' },
    description: { type: String, maxLength: 255 },
    img: { type: String, maxLength: 255 },
    createdDays: { type: Date, default: Date.now() },
    updatedDays: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Course', Course);
// mongoose.model('Course', Course): nếu không có collection được tạo sẵn thì nó sẽ tự tạo với tên courses
