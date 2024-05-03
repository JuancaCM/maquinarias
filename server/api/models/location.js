"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
	journal : { type: String, required: true },
	lat 	: { type: String, required: true },
	long 	: { type: String, required: true },
	date 	: { type: Date, required: true },
	time 	: { type: String, required: true },
	vehicle : { type: Schema.Types.ObjectId, required: true, ref: "Vehicle" },
}, { collection: "location" });

module.exports = mongoose.model('Location', locationSchema);