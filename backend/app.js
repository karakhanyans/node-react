const express = require('express');
const app = express();
const routes = require('./routes/index');
const cors = require('./config/cors');
const fileUpload = require('express-fileupload');
const validator = require('./helpers/validator');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/database');

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);
app.use(validator);
app.use('/', routes);

module.exports = app;