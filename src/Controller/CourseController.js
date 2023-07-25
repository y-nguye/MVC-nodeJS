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

    // [GET] /course/:id/edit
    async edit(req, res) {
        try {
            const promiseCourse = Course.findById(req.params.id);
            await promiseCourse
                .then((course) => getCourse(course))
                .catch((err) => console.log('ERROR 🆘', err));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse(course) {
            course.path = `/course/${course._id}`;
            res.render('editCoursePage', {
                course,
            });
        }
    }

    // action form sẽ điều hướng đến đây
    // [POST] /course/:id
    async update(req, res) {
        try {
            const promiseCourse = Course.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            await promiseCourse
                .then(() => getCourse())
                .catch((err) => console.log('ERROR 🆘', err));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse() {
            res.redirect('/me');
        }
    }

    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    force(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    formAction(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                Course.deleteOne({ _id: { $in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is not allowed' });
        }
    }
}

module.exports = new CourseController();
