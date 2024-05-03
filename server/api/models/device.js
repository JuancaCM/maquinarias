"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
	device 	: { type: String, required: true },
	model 	: { type: String, required: true },
	id 		: { type: String, required: true },
	number	: { type: String, required: false },
	company : { type: Schema.Types.ObjectId, required: true, ref: "Company" },
	active 	: { type: Boolean, required: true, default: true }
}, { collection: "device" });

module.exports = mongoose.model('Device', deviceSchema);