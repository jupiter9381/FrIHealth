const api = require("./api");
const admin = require("./admin");

module.exports = app => {
  api(app), admin(app);
};
