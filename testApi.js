const fs = require("fs");
const yargs = require("yargs");
var Request = require("request");

// ------------ Begin - command configuration -----------------

const customer_id = {
  describe: "Customer Id",
  demand: true,
  alias: "i"
};

const customer_name = {
  describe: "Customer Name",
  demand: true,
  alias: "n"
};

const customer_email = {
  describe: "Customer email",
  demand: true,
  alias: "e"
};

const argv = yargs

  .command("add", "Add a new customer", {
    customerId: customer_id,
    customerName: customer_name,
    customerEmail: customer_email
  })
  .command("list", "List all customer")

  .command("read", "Read a customer", {
    customerId: customer_id
  })

  .command("delete", "Remove a customer", {
    customerId: customer_id
  })

  .command("update", "Update a customer", {
    customerId: customer_id,
    customerName: customer_name,
    customerEmail: customer_email
  })
  .help().argv;

// ------------ End - command configuration -----------------

var command = yargs.argv._[0];
if (command === "list") {
  Request.get("http://localhost:3000/customer", (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    console.dir(JSON.parse(body));
  });
} else if (command === "read") {
  Request.get(
    `http://localhost:3000/customer/${argv.customerId}`,
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      console.dir(JSON.parse(body));
    }
  );
} else if (command === "add") {
  Request.post(
    {
      headers: { "content-type": "application/json" },
      url: "http://localhost:3000/customer",
      body: JSON.stringify({
        customer_id: argv.customerId,
        customer_name: argv.customerName,
        customer_email: argv.customerEmail
      })
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      console.dir(JSON.parse(body));
    }
  );
} else if (command === "update") {
  console.log(argv.customerId);
  Request.put(
    {
      headers: { "content-type": "application/json" },
      url: `http://localhost:3000/customer/${argv.customerId}`,
      body: JSON.stringify({
        customer_id: argv.customerId,
        customer_name: argv.customerName,
        customer_email: argv.customerEmail
      })
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      console.dir(JSON.parse(body));
    }
  );
} else if (command === "delete") {
  Request.delete(
    `http://localhost:3000/customer/${argv.customerId}`,
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      console.dir(JSON.parse(body));
    }
  );
} else {
  console.log("Command not found");
}
