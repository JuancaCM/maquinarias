"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name        : { type: String, required: true},
    active 		: { type: Boolean, required: true, default: true },
    createdAt   : { type: Date, default: Date.now },
    updatedAt   : { type: Date, default: Date.now }
}, { collection: "company" });

companySchema.method("update", function(updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

module.exports = mongoose.model('Company', companySchema);
