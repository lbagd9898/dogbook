const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

//parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("doggybook"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("app up and working");
});
