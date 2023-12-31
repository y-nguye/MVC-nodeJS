const Course = require('../Model/courseSchema');

class HomeController {
    // Lấy dữ liệu ra từ Database
    async index(req, res) {
        try {
            const promiseCourse = Course.find({});
            await promiseCourse
                .then((course) => getCourse(course))
                .then((x) => console.log(x))
                .catch((err) => console.log('ERROR 🆘', err));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse(course) {
            res.render('homePage', {
                // course: course,
                course, // ES6 viết gọn lại, nó mang ý nghĩa như dòng trên
            });
            return 'Browser refreshed 🔆';
        }
    }
}

module.exports = new HomeController();
