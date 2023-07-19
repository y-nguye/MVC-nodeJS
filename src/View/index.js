const express = require("express");
const app = express();
const path = require("path");

const route = require("./routes");

app.use(express.static(path.join(__dirname, "resources")));

// Cấu hình Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "resources/components"));

route(app);

app.listen(3000);
