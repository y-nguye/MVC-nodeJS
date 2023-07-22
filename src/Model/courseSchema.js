const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: {
            type: String,
            default: 'Mặc định khi dữ liệu trống',
            required: true,
        },
        description: { type: String, maxLength: 1024 },
        img: { type: String, maxLength: 1024 },
        videoID: { type: String, maxLength: 225 },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Course', Course);
