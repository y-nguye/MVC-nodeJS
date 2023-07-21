const Course = require('../Model/courseSchema');

class CourseController {
    async index(req, res) {
        try {
            //   Database phương thức findOne      key : value
            const promiseCourse = Course.findOne({ slug: req.params.slugXXX });
            await promiseCourse
                .then((course) => getCourse(course))
                .then((x) => console.log(x))
                .catch((err) => console.log('ERROR 🆘', err));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse(course) {
            res.render('coursesPage', {
                course,
            });
            return 'Browser refreshed 🌀';
        }
    }
}

module.exports = new CourseController();
