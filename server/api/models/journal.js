"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
	identifier  	: { type: String, required: true },
	date 			: { type: Date, required: true },
	start_time 		: { type: String, required: true },
	end_time 		: { type: String, required: false },
	company			: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
	vehicle 		: { type: Schema.Types.ObjectId, required: true, ref: "Vehicle" },
	distance 		: { type: Number, required: true },
	duration 		: { type: String, required: true },
}, { collection: "journal" });

module.exports = mongoose.model('Journal', journalSchema);
