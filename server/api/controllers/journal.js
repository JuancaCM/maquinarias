"use strict";

var mongoose = require("mongoose");
var Journal = mongoose.model("Journal");

// module.exports.getJournalByDate = function(req, res) {
//     Journal.findOne({
//         vehicle: req.body.vehicle,
//         date: req.body.date
//         // date: { $gte: req.body.startDate, $lte: req.body.endDate }
//     }).populate({path:"vehicle",populate:{ path:"driver"}}).exec(function(err, result) {
//       if (err) res.send(err);
//       res.json(result);
//     });
// }

module.exports.getAllJournalByDateRange = function(req, res) {
    Journal.find({
        date: { $gte: req.body.startDate, $lte: req.body.endDate }
        // date: { $gte: req.body.startDate, $lte: req.body.endDate }
    }).populate({path:"vehicle",populate:[{path:"device"},{ path:"driver"}]}).sort({date: 1, start_time: 1}).exec(function(err, result) {
        if (err) res.send(err);
        res.json(result);
    });
}

module.exports.getJournalByID = function(req, res) {
    Journal.findOne({
        identifier: req.body.identifier
    }).populate({path:"vehicle",populate:[{path:"device"},{ path:"driver"}]}).exec(function(err, result) {
        if (err) res.send(err);
        res.json(result);
    });
}

module.exports.addJournal = function(req, res) {
    console.log(req.body.duration)
    console.log(req.body.identifier)
    console.log(req.params.companyID)
    const journal = new Journal({
        identifier  :   req.body.identifier,
        date        :   new Date(req.body.date),
        start_time  :   req.body.start_time,
        end_time    :   req.body.end_time,
        vehicle     :   new mongoose.Types.ObjectId(req.body.vehicle),
        company     :   new mongoose.Types.ObjectId(req.params.companyID),
        distance    :   req.body.distance,
        duration    :   req.body.duration
    });
    journal.save((err, result) => {
        if (err) {
            return res.send(err); // Asegúrate de salir de la función aquí
        }
        return res.json({
            code: 777,
            data: result
        });
    });
}

module.exports.updateJournal = function(req, res) {
    Journal.findOne({
        identifier: req.body.journal,
        end_time: ""
    }, function(err, journal) {
        console.log(req.body)
        journal.end_time  = req.body.end_time
        journal.save(function(err, result) {
          if (err) return res.send(err);
          res.json({
            code: 777,
            data: result
          });
        });
    });
};

module.exports.getLastN = function(req, res) {
	console.log(req.params);
  Journal.find({ "company": req.params.companyID }).sort({ date:-1, start_time:-1 })
  .limit(req.body.nJournals).populate({path:"vehicle",populate:[{path:"device"},{ path:"driver"}]})
  .exec(function(err, result) {
      if (err) res.send(err);
      res.json(result);
  });
}
