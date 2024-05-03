"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuelSchema = new Schema({
    journal             : { type: String, required: true },
    date                : { type: Date, required: true },
    vehicle             : { type: Schema.Types.ObjectId, required: true, ref: "Vehicle" },
    dispatcher          : { type: String, required: true },
    dispatcherVehicle   : { type: String, required: true },
    liters              : { type: Schema.Types.Decimal128, required: true },
    company             : { type: Schema.Types.ObjectId, required: true, ref: "Company" },
    createdAt           : { type: Date, default: Date.now },
    updatedAt           : { type: Date, default: Date.now },
}, { collection: "fuel" });

fuelSchema.method("update", function(updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

module.exports = mongoose.model('Fuel', fuelSchema);
