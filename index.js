require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3002;
const connectionCreds = require("./databaseCreds");

app.use(express.json());
//RECIPE ROUTES
//GET /recipes: Retrieve all recipes from the Recipes table.
app.get("/get_all_recipes", (req, res) => {
  connectionCreds.connect((err, client, release) => {
    client.query(`SELECT * FROM recipes;`, (err, result) => {
      res.send(result.rows);
    });
  });
});

//POST /recipes: Create a new recipe in the Recipes table.
app.post("/create_recipe", (req, res) => {
  // below is the same way to write lines 12-14
  //const {email,username,password} = req.body;
  const id = req.body.id;
  const recipe_name = req.body.recipe_name;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `INSERT INTO recipes(id,recipe_name) VALUES($1,$2)`;
    const values = [id, recipe_name];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});
//GET /recipes/:id: Retrieve a specific recipe based on its ID.
app.get("/get_recipe/:id", (req, res) => {
  const { id } = req.params;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `SELECT * FROM recipes WHERE id=$1`;
    const values = [id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result.rows);
    });
  });
});

//PUT /recipes/:id: Update an existing recipe based on its ID.
app.put("/update_recipe/:id", (req, res) => {
  const { id } = req.params;

  const recipe_name = req.body.recipe_name;
  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `UPDATE recipes SET recipe_name =$2 WHERE id = $1;`;
    const values = [id, recipe_name];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});
//DELETE /recipes/:id: Delete a recipe based on its ID.
app.delete("/delete_recipe/:id", (req, res) => {
  const { id } = req.params;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `DELETE FROM recipes WHERE id=$1`;
    const values = [id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//CUSTOMER ROUTES
//GET /customers: Retrieve all customers from the Customers table.
app.get("/get_all_customers", (req, res) => {
  connectionCreds.connect((err, client, release) => {
    client.query(`SELECT * FROM customers;`, (err, result) => {
      res.send(result.rows);
    });
  });
});
//POST /customers: Create a new customer in the Customers table.
app.post("/create_customer", (req, res) => {
  const id = req.body.id;
  const customer_name = req.body.customer_name;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `INSERT INTO customers(id,customer_name) VALUES($1,$2)`;
    const values = [id, customer_name];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});
//GET /customers/:id: Retrieve a specific customer based on their ID.
app.get("/get_customer/:id", (req, res) => {
  const { id } = req.params;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `SELECT * FROM customers WHERE id=$1`;
    const values = [id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result.rows);
    });
  });
});
//PUT /customers/:id: Update an existing customer based on their ID.
app.put("/update_customer/:id", (req, res) => {
  const { id } = req.params;

  const customer_name = req.body.customer_name;
  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `UPDATE customers SET customer_name =$2 WHERE id = $1;`;
    const values = [id, customer_name];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});
//DELETE /customers/:id: Delete a customer based on their ID.
app.delete("/delete_customer/:id", (req, res) => {
  const { id } = req.params;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `DELETE FROM customers WHERE id=$1`;
    const values = [id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});
//GET /orders: Retrieve all orders from the Orders table.
app.get("/get_all_orders", (req, res) => {
  connectionCreds.connect((err, client, release) => {
    client.query(`SELECT * FROM orders;`, (err, result) => {
      res.send(result.rows);
    });
  });
});
//POST /orders: Create a new order in the Orders table.
app.post("/create_order", (req, res) => {
  const id = req.body.id;
  const recipe_id = req.body.recipe_id;
  const customer_id = req.body.customer_id;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `INSERT INTO orders(id,recipe_id,customer_id) VALUES($1,$2,$3)`;
    const values = [id, recipe_id, customer_id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//GET /orders/:id: Retrieve a specific order based on its ID.
app.get("/get_order/:id", (req, res) => {
  const { id } = req.params;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `SELECT * FROM orders WHERE id=$1`;
    const values = [id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result.rows);
    });
  });
});
//PUT /orders/:id: Update an existing order based on its ID.
app.put("/update_order/:id", (req, res) => {
  const { id } = req.params;

  const recipe_id = req.body.recipe_id;
  const customer_id = req.body.customer_id;
  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `UPDATE orders SET recipe_id =$2 WHERE id = $1;`;
    const values = [id, recipe_id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});
//DELETE /orders/:id: Delete an order based on its ID.
app.delete("/delete_order/:id", (req, res) => {
  const { id } = req.params;

  connectionCreds.connect((err, client, release) => {
    if (err) {
      release();
      console.error("Error connecting to the databse: ", err);
      res.status(500).send("Internal service error");
      return;
    }
    const sqlQuery = `DELETE FROM orders WHERE id=$1`;
    const values = [id];
    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.error("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
