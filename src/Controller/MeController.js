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
}

/** ***Mục đích của những việc này là không nên tạo những phép toán trong View

    Hàm .map() được sử dụng để tạo một mảng mới courseWithIndex, trong đó mỗi phần tử của mảng course đã được
    biến đổi thành một đối tượng mới chứa các thông tin như displayIndex, name, createdAt, và updatedAt.

    displayIndex: chỉ mục bắt đầu từ 1 (do i + 1) để hiển thị vị trí khóa học.
    name: tên khóa học.
    createdAt: ngày tạo khóa học.
    updatedAt: ngày cập nhật khóa học (nếu có).

    Sau khi xử lý dữ liệu, sử dụng res.render() để gửi dữ liệu đã xử lý sang tệp Pug: meCoursesPage.pug.
    Trong tệp Pug này, bạn có thể sử dụng các biến như:
    course.displayIndex, course.name, course.createdAt, và course.updatedAt
    để hiển thị thông tin tương ứng của từng khóa học trong mảng courseWithIndex.
 */

module.exports = new MeController();
