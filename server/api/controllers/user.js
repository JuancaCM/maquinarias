"use strict";

var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getAllCompanyUsers = function(req, res) {
	User.find({"company": req.params.companyID}, function(err, users) {
		if (err) res.send(err);
		res.json(users);    
	});
};

exports.getAllCompanyDrivers = function(req, res) {
	User.find({"company": req.params.companyID, "type": "Operario", "active": true}, function(err, drivers) {
		if (err) res.send(err);
		res.json(drivers);    
	});
};

exports.addUser = function(req, res) {
	var encriptedPassword = bcrypt.hashSync(req.body.password, saltRounds);
	const user = new User({
		email       :   req.body.email,
		rut         :   req.body.rut,
		name        :   req.body.name,
		last_name   :   req.body.last_name,
		company     :   req.body.company,
		phone       :   req.body.phone,
		password    :   encriptedPassword,
		type        :   req.body.type
	});
	user.save((err, result) => {
		if (err) res.send(err);
		res.json({
			code: 777,
			data: result
		});
	});
};

exports.updateUser = function(req, res) {
	var encriptedPassword = bcrypt.hashSync(req.body.password, saltRounds);
	User.findById(req.body._id, function(err, user) {
		user.email      =   req.body.email,
		user.rut        =   req.body.rut,
		user.name       =   req.body.name,
		user.last_name  =   req.body.last_name,
		user.company    =   req.body.company,
		user.phone      =   req.body.phone,
		user.password   =   encriptedPassword,
		user.type       =   req.body.type,
		user.active     =   req.body.active
		user.save(function(err, result) {
			if (err) res.send(err);
			res.json({
				code: 777,
				data: result
			});
		});
	});
};

exports.getLogin = function(req, res) {
	console.log(req.body.user);
	User.find({rut: req.body.user}).populate('company').exec(function(err, user) {
		if (err) res.send(err);
		if (user.length == 0)
			return res.json({
				status: 'fail',
				message: 'Ha ocurrido un error, el usuario ingresado no se encuentra registrado'
			})
		if (bcrypt.compareSync(req.body.password, user[0].password))
			return res.json({
				status: 'success',
				message: '',
				data: user
			})
		else
			return res.json({
				status: 'fail',
				message: 'Ha ocurrido un error, la contraseña ingresada no es correcta'
			})
	});
};