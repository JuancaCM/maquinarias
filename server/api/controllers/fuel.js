"use strict";

var mongoose = require("mongoose");
var Fuel = mongoose.model("Fuel");

module.exports.getAllCompanyFuel = function(req, res) {
	Fuel.find({"company": req.params.companyID}).populate("vehicle").sort({date:-1}).exec(function(err, fuel) {
		if (err) res.send(err);
		res.json(fuel);
	});
}

module.exports.addFuel = function(req, res) {
	console.log(req.body);
	const fuel = new Fuel({
		journal             :   req.body.journal,
		date                :   new Date(req.body.date),
		vehicle             :   new mongoose.Types.ObjectId(req.body.vehicle),
		dispatcher          :   req.body.dispatcher,
		dispatcherVehicle   :   req.body.dispatcherVehicle,
		liters              :   req.body.liters,
		company             :   new mongoose.Types.ObjectId(req.body.company)
	});
	console.log(fuel);
	fuel.save((err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json({
				code: 777
			});
		}
	});
/*	fuel.save((err, result) => {
		if (err) res.send(err);
		res.json({
			code: 777,
			data: result
		});
	});*/
}

module.exports.getFuelByDate = function(req, res) {
	var date = req.body.startDate+"T04:00:00.000Z"
	Fuel.aggregate([
	{
		$match: {
			date: { $gte: new Date(date) },
			company : mongoose.Types.ObjectId(req.params.companyID)
                // date: { $gte: req.body.startDate, $lte: req.body.endDate }
              }
            },{
            	$group: {
            		_id: null,
            		liters: { $sum: "$liters" }
            	}
            },

            ],function(err, result) {
            	if (err) res.send(err);
            	res.json(result);
            });
}

module.exports.getFuelByJournal = function(req, res) {
	Fuel.aggregate([
	{
		$match: {
			journal: req.body.journal
		}
	},{
		$group: {
			_id: null,
			liters: { $sum: "$liters" }
		}
	},

	],function(err, result) {
		if (err) res.send(err);
		res.json(result);
	});
}
