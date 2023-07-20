const Course = require('../Model/course');

class HomeController {
    // Lấy dữ liệu ra từ Database
    async index(req, res) {
        try {
            console.log(typeof (await Course.find({})), '💢'); // Object
            res.json(await Course.find({}));
        } catch (error) {
            res.status(400).json({ error: 'Fail to get Course' });
        }
        // res.render('home');
    }
}

module.exports = new HomeController();
