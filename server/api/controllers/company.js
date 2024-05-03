"use strict";

var mongoose = require("mongoose");
var Company = mongoose.model("Company");

module.exports.addCompany = function(req, res) {
    const company = new Company({
        name    :   req.body.name
    });
    company.save((err, result) => {
        if (err) res.send(err);
        res.json({
            code: 777,
            data: result
        });
    });
}

module.exports.updateCompany = function(req, res) {
    Company.findById(req.body._id, function(err, company) {
        company.name    =   req.body.name
        company.active  =   req.body.status
        company.save(function(err, result) {
            if (err) res.send(err);
            res.json({
                code: 777,
                data: result
            });
        });
    });
}