"use strict";

var mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: {
    type: String
  },
  customer_name: {
    type: String
  },
  customer_email: {
    type: String
  }
});

module.exports = mongoose.model("Customer", customerSchema);
