const httpStatus = require('http-status');
const Gateway = require('@models/Gateway');
const Device = require('@models/Device');
const ApiError = require('@app/utils/ApiError');

class GatewayService {

	async createGateway(data) {
		const { serialNumber } = data;

		if (await Gateway.serialNumberExists(serialNumber)) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'A gateway with this serial number already exists');
		}

		return await Gateway.create(data);
	}

	async updateGateway(gatewayId, data) {

		const gateway = await Gateway.findById(gatewayId);
		
		if (!gateway) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
		}

		if (await Gateway.serialNumberExists(data.serialNumber, gateway._id)) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'A gateway with this serial number already exists');
		}

		Object.assign(gateway, data);

		await gateway.save();

		return gateway;
	}

	async getGateways(params) {
		const filter = params.filter || {};

		return await Gateway.paginate(filter, {
			limit: params.limit || 10,
			page: params.page || 1,
			sortBy: params.sortBy || 'createdAt:desc',
		});
	}

	async getGateway(gatewayId) {
		return await Gateway.findById(gatewayId);
	}

	async deleteGateway(gatewayId) {
		const gateway = await Gateway.findById(gatewayId);
		
		if (!gateway) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
		}

		await gateway.remove();

		return gateway;
	}

	async createDevice(data) {
		const { gateway } = data;
		const gatewayDocument = await Gateway.findById(gateway);
		if (!gatewayDocument) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'The selected gateway is invalid');
		}

		// Each gateway cannot have more than 10 devices
		const currentCount = await Device.countDocuments({ gateway }).exec();
		if (currentCount >= 10) {
			throw new ApiError(httpStatus.BAD_REQUEST, `${gatewayDocument.name} cannot have more than 10 peripheral devices`);
		}

		return await Device.create(data);
	}

	async updateDevice(deviceId, data) {

		const device = await Device.findById(deviceId);
		
		if (!device) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
		}

		Object.assign(device, data);

		await device.save();

		return device;
	}

	async getDevices(params) {
		const filter = params.filter || {};

		return await Device.paginate(filter, {
			limit: params.limit || 10,
			page: params.page || 1,
			sortBy: params.sortBy || 'createdAt:desc',
		});
	}

	async getDevice(deviceId) {
		return await Device.findById(deviceId);
	}

	async deleteDevice(deviceId) {
		const device = await Device.findById(deviceId);
		
		if (!device) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
		}

		await device.remove();

		return device;
	}

	extractFilters(data) {
		const nonFilters = ['limit', 'sortBy', 'page'];
		const filters = {};
		for (var key in data) {
			if (nonFilters.indexOf(key) === -1) {
				filters[key] = data[key];
			}
		}

		return filters;
	}
}

module.exports = new GatewayService();