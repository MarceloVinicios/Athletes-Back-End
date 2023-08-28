const express = require("express");
const app = express();
const helmet = require('helmet');

const userRoutes = require("./src/routes/userRoutes");

app.use(helmet());

// aplication/json
app.use(express.json());

// Routes
app.use(userRoutes);

module.exports = app;
