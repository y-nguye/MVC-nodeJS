class HomeController {
    index(req, res) {
        res.render('home'); // pug
    }
}

module.exports = new HomeController();
