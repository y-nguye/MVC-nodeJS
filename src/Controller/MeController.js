const Course = require('../Model/courseSchema');

class MeController {
    async myCourse(req, res) {
        try {
            const promiseCourse = Course.find({});
            await promiseCourse
                .then((course) => getCourse(course))
                .catch((err) => console.log('ERROR 🆘', err));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse(course) {
            const courseWithIndex = course.map((x, i) => ({
                displayIndex: i + 1,
                id: x._id,
                name: x.name,
                createdAtPug: x.createdAt,
                updatedAtPug: x.updatedAt,
            }));
            res.render('meCoursesPage', {
                course: courseWithIndex,
            });
        }
    }

    async myTrash(req, res) {
        try {
            const promiseCourse = Course.findWithDeleted({ deleted: true });
            await promiseCourse.then((course) => getCourse(course));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse(course) {
            const courseWithIndex = course.map((x, i) => ({
                displayIndex: i + 1,
                id: x._id,
                name: x.name,
                deletedAt: x.deletedAt,
            }));
            res.render('meTrashPage', {
                course: courseWithIndex,
            });
        }
    }

    async restore(req, res, next) {
        try {
            const promiseCourse = Course.restore({ _id: req.params.id });
            await promiseCourse.then(() => getCourse());
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse() {
            res.redirect('back');
        }
    }
}

module.exports = new MeController();
