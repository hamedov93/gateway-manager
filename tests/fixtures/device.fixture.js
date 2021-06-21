const mongoose = require('mongoose');
const faker = require('faker');
const { Device } = require('@models');

const deviceOne = {
  _id: mongoose.Types.ObjectId(),
  uid: faker.datatype.number(100),
  vendor: faker.name.findName(),
  status: faker.random.arrayElement(['online', 'offline']),
};

const deviceTwo = {
  _id: mongoose.Types.ObjectId(),
  uid: faker.datatype.number(100),
  vendor: faker.name.findName(),
  status: faker.random.arrayElement(['online', 'offline']),
};

const insertDevices = async (devices) => {
  await Device.insertMany(devices);
};

module.exports = {
  deviceOne,
  deviceTwo,
  insertDevices,
};
