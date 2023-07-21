const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, default: 'Mặc định khi dữ liệu trống' },
        description: { type: String, maxLength: 1024 },
        img: { type: String, maxLength: 1024 },
        videoID: { type: String, maxLength: 225 },
        slug: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Course', Course);
