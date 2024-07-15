const express = require("express");
const mysql = require("mysql");
// const cors = require("cors");

const PORT = 3000;

const app = express();

app.use(express.static("public"));

// app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

// Fetch All Users
app.get("/fetch-all-users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Create User
app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  db.query(
    "INSERT INTO users (name, email) VALUES (?,?)",
    [name, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// Edit User
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  if(!id){
    res.status(400).sendStatus("400");
  }
  db.query("SELECT * FROM users WHERE id = " + id,(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Update User
app.put("/update", (req, res) => {
  let body = req.body;

  if(!body){
    return res.status(400).sendStatus("400");
  }
  db.query("UPDATE users SET ? WHERE id = " + 
    body.id ,{name :body.name, email:body.emai},
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
    

// Delete User
app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  console.log('User ID to delete:', id);
  if (!id) {
      res.status(400).send({ error: "Invalid user ID" });
      return;
  }

  db.query("DELETE FROM users WHERE id = " + id, (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send({ error: "Database error occurred" });
      } else if (result.affectedRows === 0) {
          res.status(404).send({ error: "User not found" });
      } else {
          res.send({ message: "User deleted successfully", result });
      }
  });
});

  

// listen to server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
