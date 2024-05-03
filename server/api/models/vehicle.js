"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  patent      : { type: String, required: true, unique: true },
  vehicle     : { type: String, required: true },
  company     : { type: Schema.Types.ObjectId, required: true, ref: "Company" },
  type        : { type: String, required: true },
  driver      : { type: Schema.Types.ObjectId, required: false, ref: "User" },
  device      : { type: Schema.Types.ObjectId, required: false, ref: "Device" },
  createdAt   : { type: Date, default: Date.now },
  updatedAt   : { type: Date, default: Date.now },
  active      : { type: Boolean, required: true, default: true }
}, { collection: "vehicle" });

vehicleSchema.method("update", function(updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
