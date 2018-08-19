"use strict";

// npm packages

const express = require("express");
const port = process.env.PORT || 8000;

const configDB = require("./config/database.js");

const mongoose = require("mongoose");

// Init app
const app = express();

app.use(express.static(__dirname));
app.set("view engine", "pug");
// MongoDB connect

mongoose.connect(
  configDB.URL,
  { useNewUrlParser: true }
); // connect to our database

require("./app/routes.js")(app);

app.listen(port);
