const cors = require('cors');
const bodyParser = require('body-parser');
const express  = require('express');
const app  = express();
const authentication = require('./routes/Authentication')

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(bodyParser.json())
app.use('/authentication',authentication);

module.exports = app;