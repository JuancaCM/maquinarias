"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverVehicleSchema = new Schema({
	driver 	: { type: String, required: true },
	vehicle : { type: String, required: true }
}, { collection: "driverVehicle" });

module.exports = mongoose.model('DriverVehicle', driverVehicleSchema);