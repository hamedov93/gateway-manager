require('module-alias/register');
require('dotenv').config();

const app = require('@app');
const config = require('@root/config');
const mongoose = require('mongoose');

mongoose.connect(config.mongo.url, config.mongo.options);

const db = mongoose.connection;

let server;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongodb');
  server = app.listen(config.port, () => {
    console.info(`Nodejs server listening on port ${config.port}`);
  });
});
