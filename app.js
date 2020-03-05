const fs = require("fs");
const yargs = require("yargs");
var express = require("express");
var routes = require("./api/routes/customerRoutes");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Customer = (Task = require("./api/models/customerModels"));

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CustomerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
