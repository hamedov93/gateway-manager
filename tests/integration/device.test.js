require('module-alias/register');
const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('@app');
const setupTestDB = require('../utils/setupTestDB');
const { Gateway, Device } = require('@models');
const { deviceOne, deviceTwo, insertDevices } = require('../fixtures/device.fixture');
const { gatewayOne } = require('../fixtures/gateway.fixture');

setupTestDB();

describe('Device routes', () => {

  let gateway;
	let newDevice;

	beforeEach(async () => {
    gateway = await new Gateway({
      name: faker.name.findName(),
      serialNumber: faker.datatype.uuid(),
      ipAddress: faker.internet.ip(),
    }).save();

    newDevice = {
      uid: faker.datatype.number(100),
      vendor: faker.name.findName(),
      status: faker.random.arrayElement(['online', 'offline']),
      gateway: gateway._id,
    };
  });

  // We may also add tests to check for max number of devices per gateway
  test('should return 201 and successfully create new device if data is ok', async () => {    

    const res = await request(app)
      .post('/devices')
      .send(newDevice)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual(expect.objectContaining({
      id: expect.anything(),
      uid: newDevice.uid,
      vendor: newDevice.vendor,
      status: newDevice.status,
      gateway: newDevice.gateway.toString(),
    }));

    const dbDevice = await Device.findById(res.body.id);
    expect(dbDevice).toBeDefined();
    expect(dbDevice).toMatchObject({ uid: newDevice.uid, vendor: newDevice.vendor, status: newDevice.status, gateway: newDevice.gateway });
  });

  test('should return 200 and successfully update device if data is ok', async () => {
    const device = new Device(newDevice);
    await device.save();

    const newUid = faker.datatype.number(100);
    const newDeviceData = {
      uid: newUid,
      vendor: 'Microsoft',
      status: 'online',
      gateway: device.gateway.toString(),
    };

    const res = await request(app)
      .put('/devices/' + device._id)
      .send(newDeviceData)
      .expect(httpStatus.OK);

    expect(res.body).toMatchObject(newDeviceData);
  });

  test('should return 200 and successfully fetch device details if data is ok', async () => {
    const device = new Device(newDevice);
    await device.save();

    const res = await request(app)
      .get('/devices/' + device._id)
      .send()
      .expect(httpStatus.OK);

    expect(res.body).toMatchObject({ ...newDevice, gateway: newDevice.gateway.toString()});
  });

  test('should return 200 and successfully delete delete', async () => {
  	const device = new Device(newDevice);
    await device.save();

    const res = await request(app)
      .delete('/devices/' + device._id)
      .send()
      .expect(httpStatus.OK);

    const dbDevice = await Device.findById(device._id);
    expect(dbDevice).toEqual(null);
  });

  test('should return 200 and successfully fetch device list', async () => {
    deviceOne.gateway = gateway._id;
    deviceTwo.gateway = gateway._id;
  	await insertDevices([deviceOne, deviceTwo]);

    	const res = await request(app)
      	.get('/devices')
      	.send()
      	.expect(httpStatus.OK);

     	// We could apply more checks
      expect(res.body.data.length).toEqual(2);
  });

  // TODO: Add more tests for different list filters and pagination params
});
