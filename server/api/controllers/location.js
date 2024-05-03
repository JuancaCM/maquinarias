"use strict";

var mongoose = require("mongoose");
var Location = mongoose.model("Location");

module.exports.getAllPointsVehicleByDate = function(req, res) {
  Location.find({ identifier: req.body.journal, date: req.body.date }, function(err, points) {
    if (err) res.send(err.message);
    res.json({
      code: 777,
      data: points
    });
  });
}

module.exports.getAllPointsVehicleByJournal = function(req, res) {
  Location.find({ journal: req.body.journal }, function(err, points) {
    if (err) res.send(err.message);
    res.json({
      code: 777,
      data: points
    });
  });
}

module.exports.getAllVehiclesLocationsByDate = function(req, res) {
  var date = req.body.startDate+"T04:00:00.000Z"
  Location.find({
    date: { $gte: new Date(date) }
  }).populate({path: "vehicle", match: { company: req.params.companyID }}).exec(function(err, result) {
  // }).populate({path: "vehicle", match: { company: req.params.companyID }}).exec(function(err, result) {
      if (err) res.send(err);
      res.json(result);
  });
}

module.exports.addPoint = function(req, res) {
  const location = new Location({
    journal : req.body.journal,
    lat     : req.body.lat,
    long    : req.body.long,
    date    : new Date(req.body.date),
    time    : req.body.time,
    vehicle : new mongoose.Types.ObjectId(req.body.vehicle)
  });
  location.save((err, result) => {
    if (err) res.send(err);
    res.json({
        code: 777,
        data: result
    });
  });
}

module.exports.deletePoint = function(req, res) {
  Location.findById(req.body.id, function(err, point) {
    point.remove(function(err) {
      if (err) return res.status(500).send(err.message);
      return res.status(200).json({
        status  :   "success",
        data  :   result
      });
    });
  });
}
