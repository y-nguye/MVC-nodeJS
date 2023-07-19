const newRouter = require("./home");

function route(app) {
  app.use("/", newRouter);
}

module.exports = route;
