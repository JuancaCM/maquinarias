"use strict";
var express        = require('express');
var user           = require("./controllers/user.js");
var device         = require("./controllers/device.js");
var driver         = require("./controllers/driver.js");
var location       = require("./controllers/location.js");
var vehicle        = require("./controllers/vehicle.js");
var fuel           = require("./controllers/fuel.js");
var pause          = require("./controllers/pause.js");
var journal        = require("./controllers/journal.js");
var company        = require("./controllers/company.js");

var api = express.Router();

// USER API
api.get("/user/:companyID", user.getAllCompanyUsers);
api.post("/user/:companyID/add", user.addUser);
api.post("/user/:companyID/update", user.updateUser);
api.get("/user/:companyID/drivers", user.getAllCompanyDrivers);
api.post("/user", user.getLogin);

// DEVICE API
api.get("/device/:companyID", device.getAllCompanyDevices);
api.post("/device/:companyID/add", device.addDevice);
api.post("/device/:companyID/update", device.updateDevice);
api.get("/device/id/:deviceID", device.findDeviceByID);

// VEHICLE API
api.get("/vehicle/:companyID", vehicle.findAllCompanyVehicles);
api.post("/vehicle/:companyID/add", vehicle.addVehicle);
api.post("/vehicle/:companyID/update", vehicle.updateVehicle);
api.get("/vehicle/:companyID/device/:deviceID", vehicle.getVehicleByDevice);
api.get("/vehicle/:companyID/driver/:driverID", vehicle.getVehicleByDriver);

// LOCATION API
// app.route("/location/:companyID")
//     .post(location.getAllPointsVehicleByDate);
api.post("/location", location.getAllPointsVehicleByJournal);
api.post("/location/:companyID/date", location.getAllVehiclesLocationsByDate);
api.post("/location/:companyID/add", location.addPoint);

// FUEL API
api.get("/fuel/company/:companyID", fuel.getAllCompanyFuel);
api.post("/fuel/company/:companyID/add", fuel.addFuel);
api.post("/fuel/company/:companyID/total", fuel.getFuelByDate);
api.post("/fuel/journal", fuel.getFuelByJournal);

// PAUSE API
api.post("/pause", pause.getAllPausesByJournal);
// app.route("/pause/:companyID")
//     .post(pause.getAllPauses);
api.post("/pause/:companyID/add", pause.addPause);

// JOURNAL API
// app.route("/journal/:companyID/")
//     .post(journal.getJournalByDate);
api.post("/journal/:companyID/add", journal.addJournal);
api.post("/journal/:companyID/update", journal.updateJournal);
api.post("/journal/:companyID/journals", journal.getAllJournalByDateRange);
api.post("/journal/detail", journal.getJournalByID);
api.post("/journal/:companyID/lastN", journal.getLastN);

// COMPANY API
api.post("/company/add", company.addCompany);
api.post("/company/update", company.updateCompany);


module.exports = api;
