const express = require("express");
const app = express();
const port = process.env.PORT || 3150;
const mongoose = require("mongoose");
const models = require("./api/models/index");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

mongoose.Promise = global.Promise;
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/maquinaria");

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port);

var routes = require("./api/routes");
app.use("/api", routes);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log("Server started on: " + port);
