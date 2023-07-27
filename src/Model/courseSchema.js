const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const autoIncrement = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
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
        _id: false,
        timestamps: true,
    }
);

Course.query.sortStable = function (req, res) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        const type = isValidType ? req.query.type : 'asc';

        res.locals._sort.type = type;

        return this.sort({
            [req.query.column]: type,
        });
    }
    return this;
};

// Đăng ký plugin mongoose-plugin-autoinc với schema
Course.plugin(autoIncrement.plugin, {
    model: 'Course', // Tên model cần tự tăng ID
    field: '_id', // Tên trường sẽ tự tăng ID
    startAt: 1, // Giá trị bắt đầu của ID tự tăng
    incrementBy: 1, // Bước nhảy giữa các ID
});

Course.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
