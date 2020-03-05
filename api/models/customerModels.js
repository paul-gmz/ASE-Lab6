"use strict";

var mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  customer_name: {
    type: String
  },
  customer_email: {
    type: String
  }
});

module.exports = mongoose.model("Customer", customerSchema);
