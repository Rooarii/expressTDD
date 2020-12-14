// app.js
const express = require('express');
const bodyParser = require('body-parser');

// route import
const home = require('./routes/index')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', home);

module.exports = app;
