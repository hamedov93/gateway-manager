const mongoose = require('mongoose');
const faker = require('faker');
const { Gateway } = require('@models');

const gatewayOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  serialNumber: faker.datatype.uuid(),
  ipAddress: faker.internet.ip(),
};

const gatewayTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  serialNumber: faker.datatype.uuid(),
  ipAddress: faker.internet.ip(),
};

const insertGateways = async (gateways) => {
  await Gateway.insertMany(gateways);
};

module.exports = {
  gatewayOne,
  gatewayTwo,
  insertGateways,
};
