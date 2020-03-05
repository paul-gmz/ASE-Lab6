"use strict";

module.exports = function(app) {
  const customer = require("../controllers/customerController");

  // Customer Routes
  app
    .route("/customer")
    .get(customer.getAllCustomers)
    .post(customer.addCustomer);

  app
    .route("/customer/:custId")
    .get(customer.getACustomer)
    //.put()
    .delete(customer.deleteCustomer);
};
