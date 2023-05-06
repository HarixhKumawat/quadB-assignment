const express = require('express');
const quadB = require('./Routes/quadB');
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json())
app.use('/quadB', quadB);

module.exports = app