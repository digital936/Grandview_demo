const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/properties", (req, res) => {
  db.query("SELECT * FROM properties", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

app.get("/", (req, res) => {
  res.send("Backend Working 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});