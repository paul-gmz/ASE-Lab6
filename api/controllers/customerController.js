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

exports.getACustomer = function(req, res) {
  Customer.find({ customer_id: req.params.custId }, function(err, cust) {
    if (err) {
      res.send(err);
    }
    res.json(cust);
  });
};

exports.addCustomer = function(req, res) {
  var newCust = new Customer(req.body);
  Customer.countDocuments({ customer_id: newCust.customer_id }, function(
    err,
    c
  ) {
    if (c > 0) {
      res.json("Already exist");
    } else {
      newCust.save(function(err, cust) {
        if (err) {
          res.send(err);
        }
        res.json(cust);
      });
    }
  });
};

exports.deleteCustomer = function(req, res) {
  Customer.deleteOne(
    {
      customer_id: req.params.custId
    },
    function(err, cust) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Customer successfully deleted" });
    }
  );
};
