"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pauseSchema = new Schema({
    journal     : { type: String, required: true },
    date        : { type: Date, required: true },
    start_time  : { type: String, required: true },
    end_time    : { type: String, required: true },
    reason      : { type: String, required: true },
    vehicle     : { type: Schema.Types.ObjectId, required: true, ref: "Vehicle" },
    createdAt   : { type: Date, default: Date.now },
    updatedAt   : { type: Date, default: Date.now }
}, { collection: "pause" });

pauseSchema.method("update", function(updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

module.exports = mongoose.model('Pause', pauseSchema);
