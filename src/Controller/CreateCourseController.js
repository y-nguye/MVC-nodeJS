const Course = require('../Model/courseSchema');
const slugify = require('slugify');

class CreateCourseController {
    create(req, res) {
        res.render('createCoursePage');
    }
    async store(req, res) {
        try {
            const formData = req.body;
            formData.slug = slugify(formData.name, { lower: true });
            const newCourses = await Course.insertMany(formData);
            console.log('Đã thêm các tài liệu mới:', newCourses);
            res.redirect('/');
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu:', error);
            res.status(500).send('Có lỗi xảy ra khi thêm dữ liệu.' + error);
        }
    }
}

module.exports = new CreateCourseController();
