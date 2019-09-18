//imports

var express = require("express");
var router = express.Router;
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var ejs = require("ejs");

//custom pulgins
const cors = require("./custom-middlewares/cors");
const errorHandler = require("./custom-middlewares/error-handler");
const bodyParser = require("body-parser");

module.exports = app => {
  //configuration of sequences
  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors);

  // configuration of all static path
  console.log(path.join(__dirname, "../public"));

  //setting routes here
  app.use("/public", express.static(path.join(__dirname, "../public")));

  require("./routes")(app);

  //error handler for all fucking bugs
  app.use(errorHandler);
};
