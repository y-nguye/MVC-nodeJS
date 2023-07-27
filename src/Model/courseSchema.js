const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

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

Course.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
