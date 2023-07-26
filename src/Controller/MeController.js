const Course = require('../Model/courseSchema');
const escape = require('escape-html');

class MeController {
    async myCourse(req, res) {
        try {
            let promiseCourse = Course.find({});
            const sortLocals = res.locals._sort;

            // Cách sort cơ bản
            // Kiểm tra xem '_sort' có tồn tại trên query không
            if (req.query.hasOwnProperty('_sort')) {
                promiseCourse = promiseCourse.sort({
                    // Loại sắp xếp: bóc trên url thả vào
                    [req.query.column]: req.query.type,
                });
            }

            await promiseCourse
                .then((course) => getCourse(course, sortLocals))
                .catch((err) => console.log('ERROR 🆘', err));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }

        function getCourse(course, sortLocals) {
            const courseWithIndex = course.map((x, i) => ({
                displayIndex: i + 1,
                id: x._id,
                name: x.name,
                createdAtPug: x.createdAt,
                updatedAtPug: x.updatedAt,
            }));
            const sortable = {
                setPug(field) {
                    const sortType =
                        field === sortLocals.column ? sortLocals.type : 'asc';

                    const icons = {
                        default: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-circle ms-1" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                        </svg>`,

                        asc: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-circle ms-1" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                        </svg>`,

                        desc: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-circle-fill ms-1" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zM5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                        </svg>`,
                    };

                    const types = {
                        asc: 'desc',
                        desc: 'asc',
                    };

                    // Điều này cũng tương tự như if-else nhưng cao cấp hơn
                    const icon = icons[sortType];
                    const type = types[sortType];

                    //           Type query sẽ được truyền vào sortLocals -> sortLocals.type sẽ thay đổi
                    //                                                  |
                    const href = escape(`?_sort&column=${field}&type=${type}`);

                    return `<a href='${href}'>${icon}`;
                },
            };
            res.render('meCoursesPage', {
                course: courseWithIndex,
                sortable,
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
