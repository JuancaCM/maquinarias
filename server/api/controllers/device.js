"use strict";

var mongoose = require("mongoose");
var Device = mongoose.model("Device");

module.exports.getAllCompanyDevices = function(req, res) {
    Device.find({"company": req.params.companyID}, function(err, devices) {
        if (err) res.send(err);
        res.json(devices);  
    });
}

module.exports.addDevice = function(req, res) {
    const device = new Device({
        device      : req.body.device,
        model       : req.body.model,
        id          : req.body.id,
        number      : req.body.number,
        company     : new mongoose.Types.ObjectId(req.body.company)
    });
    device.save((err, result) => {
        if (err) res.status(500).send(err.message);
        res.json({
            code: 777,
            data: result
        });
    });
}

module.exports.updateDevice = function(req, res) {
    Device.findById(req.body._id, function(err, device) {
        device.device   =   req.body.device,
        device.model    =   req.body.model,
        device.id       =   req.body.id,
        device.number   =   req.body.number,
        device.company  =   req.body.company,
        device.active   =   req.body.active
        device.save(function(err, result) {
            if (err) res.send(err);
            res.json({
                code: 777,
                data: result
            });
        });
    });
}

module.exports.findDeviceByID = function(req, res) {
    Device.find({ id: req.params.deviceID }, function(err, device) {
        if (err) res.send(err);
        if (device.length == 0)
            res.json({
                status : "fail",
                message : "Ha ocurrido un error, el dispositivo no se encuentra registrado en el sistema"
            })
        else
            res.json({
                status : "success"
            })
    });
}