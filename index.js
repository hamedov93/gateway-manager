require('module-alias/register');
require('dotenv').config();

const app = require('@app');
const config = require('@root/config');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/gateway_manager', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

let server;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongodb');
  server = app.listen(config.port, () => {
    console.info(`Nodejs server listening on port ${config.port}`);
  });
});
