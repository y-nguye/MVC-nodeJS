const express = require("express");
const router = express.Router();

const homeController = require("../../Controller/HomeController");

router.use("/", homeController.index);

module.exports = router;
