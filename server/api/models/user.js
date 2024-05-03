"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email       : { type: String, required: true, unique: true },
    rut         : { type: String, required: true },
    name        : { type: String, required: true },
    last_name   : { type: String, required: true },
    company     : { type: Schema.Types.ObjectId, required: true, ref: "Company" },
    password    : { type: String, required: true },
    createdAt   : { type: Date, default: Date.now },
    updatedAt   : { type: Date, default: Date.now },
    type        : { type: String, required: true },
    active      : { type: Boolean, required: true, default: true }
}, { collection: "user" });

userSchema.method("update", function(updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

module.exports = mongoose.model('User', userSchema);