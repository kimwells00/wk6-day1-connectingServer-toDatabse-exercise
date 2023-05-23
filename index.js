require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3002;
const connectionCreds = require("./databaseCreds");

app.use(express.json());

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

//PUT /recipes/:id: Update an existing recipe based on its ID.
//DELETE /recipes/:id: Delete a recipe based on its ID.
app.delete("/delete_recipe/:id", (req, res) => {
  const { id } = req.params;
  res.send(id);
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
