const express = require('express');
const xss = require('xss-clean');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('@app/routes');
const { errorConverter, errorHandler } = require('@app/middlewares/error');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(xss());

app.use(cors());
app.options('*', cors());

app.use('/api', routes);
app.use('/', express.static(__dirname + '/../ui/build'));

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
