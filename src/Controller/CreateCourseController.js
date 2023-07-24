const Course = require('../Model/courseSchema');
const slugify = require('slugify');

class CreateCourseController {
    create(req, res) {
        const course = {};
        course.path = '/create/store';
        res.render('createCoursePage', { course });
    }
    async store(req, res) {
        try {
            const formData = req.body;
            formData.slug = slugify(formData.name, { lower: true });
            await Course.create(formData);
            res.redirect('/');
        } catch (error) {
            res.status(500).send(
                'Có lỗi xảy ra khi thêm dữ liệu, mã lỗi: ' + error
            );
        }
    }
}

module.exports = new CreateCourseController();
