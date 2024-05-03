"use strict";

var mongoose = require("mongoose");
var Pause = mongoose.model("Pause");

module.exports.getAllPauses = function(req, res) {
  let vehicle = req.body.vehicle;
  let date  = req.body.date;
  Pause.find({ vehicle: vehicle, date: date }, function(err, result) {
    if (err) res.send(err);
    res.json(result);
  });
}

module.exports.getAllPausesByJournal = function(req, res) {
  Pause.find({ journal: req.body.journal }, function(err, result) {
    if (err) res.send(err);
    res.json(result);
  });
}

module.exports.addPause = function(req, res) {
  const pause = new Pause({
    journal     :   req.body.journal,
    date        :   new Date(req.body.date),
    start_time  :   req.body.start_time,
    end_time    :   req.body.end_time,
    reason      :   req.body.reason,
    vehicle     :   new mongoose.Types.ObjectId(req.body.vehicle)
  });
  pause.save((err, result) => {
      if (err) res.send(err);
      res.json({
        code: 777,
        data: result
      });
  });
}