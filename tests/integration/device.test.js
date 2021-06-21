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
    };

    const res = await request(app)
      .put('/devices/' + device._id)
      .send(newDeviceData)
      .expect(httpStatus.OK);

    // expect(res.body).toMatchObject(newDeviceData);
  });

  // test('should return 200 and successfully fetch gateway details if data is ok', async () => {
  //   const gateway = new Gateway(newGateway);
  //   await gateway.save();

  //   const res = await request(app)
  //     .get('/gateways/' + gateway._id)
  //     .send()
  //     .expect(httpStatus.OK);

  //   expect(res.body.name).toEqual(gateway.name);
  //   expect(res.body.serialNumber).toEqual(gateway.serialNumber);
  //   expect(res.body.ipAddress).toEqual(gateway.ipAddress);
  //   expect(res.body._id).toBeDefined();
  //   expect(res.body.createdAt).toBeDefined();
  //   expect(res.body.updatedAt).toBeDefined();
  // });

  // test('should return 200 and successfully delete gateway', async () => {
  // 	const gateway = new Gateway(newGateway);
  //   await gateway.save();

  //   const res = await request(app)
  //     .delete('/gateways/' + gateway._id)
  //     .send()
  //     .expect(httpStatus.OK);

  //   const dbGateway = await Gateway.findById(gateway._id);
  //   	expect(dbGateway).toEqual(null);
  // });

  // test('should return 200 and successfully fetch gateway list', async () => {
  // 	await insertGateways([gatewayOne, gatewayTwo]);

  //   	const res = await request(app)
  //     	.get('/gateways')
  //     	.send()
  //     	.expect(httpStatus.OK);

  //    	// We could apply more checks
  //     expect(res.body.data.length).toEqual(2);
  // });

    // TODO: Add more tests for different list filters and pagination params
});
