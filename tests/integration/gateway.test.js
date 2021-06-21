require('module-alias/register');
const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('@app');
const setupTestDB = require('../utils/setupTestDB');
const { Gateway } = require('@models');
const { gatewayOne, gatewayTwo, insertGateways } = require('../fixtures/gateway.fixture');

setupTestDB();

describe('Gateway routes', () => {

	let newGateway;

	beforeEach(() => {
      newGateway = {
        name: faker.name.findName(),
        serialNumber: faker.datatype.uuid(),
        ipAddress: faker.internet.ip(),
      };
    });

    test('should return 201 and successfully create new gateway if data is ok', async () => {
      await insertGateways([gatewayOne]);

      const res = await request(app)
        .post('/gateways')
        .send(newGateway)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual(expect.objectContaining({
        id: expect.anything(),
        name: newGateway.name,
        serialNumber: newGateway.serialNumber,
        ipAddress: newGateway.ipAddress,
      }));

      const dbGateway = await Gateway.findById(res.body.id);
      expect(dbGateway).toBeDefined();
      expect(dbGateway).toMatchObject({ name: newGateway.name, serialNumber: newGateway.serialNumber, ipAddress: newGateway.ipAddress });
    });

    test('should return 200 and successfully update gateway if data is ok', async () => {
      const gateway = new Gateway(newGateway);
      await gateway.save();

      const res = await request(app)
        .put('/gateways/' + gateway._id)
        .send({
        	name: newGateway.name + ' updated',
        	serialNumber: newGateway.serialNumber,
        	ipAddress: newGateway.ipAddress,
        })
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual(newGateway.name + ' updated');
    });

    test('should return 200 and successfully fetch gateway details if data is ok', async () => {
      const gateway = new Gateway(newGateway);
      await gateway.save();

      const res = await request(app)
        .get('/gateways/' + gateway._id)
        .send()
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual(gateway.name);
      expect(res.body.serialNumber).toEqual(gateway.serialNumber);
      expect(res.body.ipAddress).toEqual(gateway.ipAddress);
      expect(res.body._id).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.updatedAt).toBeDefined();
    });

    test('should return 200 and successfully delete gateway', async () => {
    	const gateway = new Gateway(newGateway);
	    await gateway.save();

	    const res = await request(app)
	      .delete('/gateways/' + gateway._id)
	      .send()
	      .expect(httpStatus.OK);

	    const dbGateway = await Gateway.findById(gateway._id);
      	expect(dbGateway).toEqual(null);
    });

    test('should return 200 and successfully fetch gateway list', async () => {
    	await insertGateways([gatewayOne, gatewayTwo]);

      	const res = await request(app)
        	.get('/gateways')
        	.send()
        	.expect(httpStatus.OK);

       	// We could apply more checks
        expect(res.body.data.length).toEqual(2);
    });

    // TODO: Add more tests for different list filters and pagination params
});
