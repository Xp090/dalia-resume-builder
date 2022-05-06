const express = require('express')
require('express-async-errors');
const bodyParser = require('body-parser')
const helmet = require("helmet");
const {errorHandler} = require("./middleware/errorHandling.middleware");
const app = express()
require('dotenv').config()


app.use(bodyParser.json())
app.use(helmet());

app.use('/api/resumeBuilder', [
    require('./routes/resumeBuilder.route')
])

app.use(errorHandler);

module.exports = app
