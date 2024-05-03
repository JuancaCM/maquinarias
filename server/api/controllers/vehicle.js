"use strict";

var mongoose = require("mongoose");
var Vehicle = mongoose.model("Vehicle");
var User = mongoose.model("User");

module.exports.findAllCompanyVehicles = function(req, res) {
	Vehicle.find({"company": req.params.companyID}).populate("driver").exec(function(err, vehicles) {
		if (err) res.send(err);
		res.json(vehicles);    
	});
}

module.exports.addVehicle = function(req, res) {
	const vehicle = new Vehicle({
		patent  :   req.body.patent,
		vehicle :   req.body.vehicle,
		company :   req.body.company,
		driver  :   new mongoose.Types.ObjectId(req.body.driver),
		device  :   req.body.device,
		type    :   req.body.type
		// qrCode	:   req.body.qrCode,
	});
	vehicle.save((err, result) => {
        if (err) {
            return res.send(err); // Asegúrate de salir de la función aquí
        }
        return res.json({
            code: 777,
            data: result
        });
	});
}

module.exports.updateVehicle = function(req, res) {
	Vehicle.findById(req.body._id, function(err, vehicle) {
		vehicle.patent  =   req.body.patent,
		vehicle.vehicle =   req.body.vehicle,
		vehicle.company =   req.body.company,
		vehicle.type    =   req.body.type,
		vehicle.driver  =   new mongoose.Types.ObjectId(req.body.driver),
		vehicle.device  =   req.body.device,
		vehicle.active  =   req.body.active
		vehicle.save(function(err, result) {
			if (err) res.send(err);
			res.json({
				code: 777,
				data: result
			});
		});
	});
}

module.exports.getVehicleByDevice = function(req, res) {
	Vehicle.find({device: req.params.deviceID}, function(err, vehicle) {
		if (err) res.send(err);
		res.json(vehicle);    
	});
}

module.exports.getVehicleByDriver = function(req, res) {
	Vehicle.find({driver: req.params.driverID}, function(err, vehicle) {
		if (err) res.send(err);
		res.json({
			data: vehicle
		});
	});
} 