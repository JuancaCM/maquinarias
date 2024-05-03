"use strict";

var mongoose = require("mongoose");
var DriverVehicle = mongoose.model("DriverVehicle");

module.exports.findDriverVehicle = function(req, res) {
	let driver	= req.body.driver;
	Driver.find({ driver: driver}, function(err, vehicle) {
		if (err) res.status(500).send(err.message);
		res.status(200).json(vehicle);
	});
}

module.exports.addDriver = function(req, res) {
	const driver = new Driver({
		driver	: 	req.body.driver,
		vehicle	: 	req.body.vehicle
	});
	driver.save((err, result) => {
		if (err) res.status(500).send(err.message);
		return res.status(200).json({
			status	: "success",
			data	: result
		});
	});
}

module.exports.updateDriver = function(req, res) {
	const driver = new Driver({
		driver	: 	req.body.driver,
		vehicle	: 	req.body.vehicle
	});
	driver.save((err, result) => {
		if (err) res.status(500).send(err.message);
		return res.status(200).json({
			status	: "success",
			data	: result
		});
	});
}

module.exports.deleteDriver = function(req, res) {
	Driver.findById(req.body.id, function(err, driver) {
		driver.remove(function(err) {
			if (err) return res.status(500).send(err.message);
			return res.status(200).json({
				status	: 	"success",
				data	: 	result
			});
		});
	});
}