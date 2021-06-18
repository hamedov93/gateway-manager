
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/gateway_manager', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongodb');
});