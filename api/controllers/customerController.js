"use strict";
const fs = require("fs");
var mongoose = require("mongoose");

var Customer = mongoose.model("Customer");

//Reads all the customers
exports.getAllCustomers = function(req, res) {
  Customer.find({}, function(err, cust) {
    if (err) {
      res.send(err);
    }
    res.json(cust);
  });
};

//Reads a customer
exports.getACustomer = function(req, res) {
  Customer.find({ customer_id: req.params.custId }, function(err, cust) {
    if (err) {
      res.send(err);
    }
    if (cust.length == 0) {
      res.json("No customer found");
    } else {
      res.json(cust);
    }
  });
};

//Adds a customer
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

//Updates a customer
exports.updateCustomer = function(req, res) {
  var newCust = new Customer(req.body);
  var queryCondition = { customer_id: req.params.custId };
  var newValues = {
    $set: {
      customer_name: newCust.customer_name,
      customer_email: newCust.customer_email
    }
  };
  Customer.countDocuments(queryCondition, function(err, c) {
    if (c == 0) {
      res.json("Customer not found");
    } else {
      Customer.updateOne(queryCondition, newValues, function(err, cust) {
        if (err) {
          res.send(err);
        }
        res.json("Customer successfully modified");
      });
    }
  });
};

//Deletes a customer
exports.deleteCustomer = function(req, res) {
  Customer.deleteOne(
    {
      customer_id: req.params.custId
    },
    function(err, cust) {
      if (err) {
        res.send(err);
      }
      res.json("Customer successfully deleted");
    }
  );
};
