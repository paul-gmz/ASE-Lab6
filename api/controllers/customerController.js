"use strict";
const fs = require("fs");
var mongoose = require("mongoose");

var Customer = mongoose.model("Customer");

exports.getAllCustomers = function(req, res) {
  Customer.find({}, function(err, cust) {
    if (err) {
      res.send(err);
    }
    res.json(cust);
  });
};

exports.addCustomer = function(req, res) {
  var newCust = new Customer(req.body);
  newCust.save(function(err, cust) {
    if (err) {
      res.send(err);
    }
    res.json(cust);
  });
};
