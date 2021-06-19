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

	async getGateways(filters) {
		return await Gateway.paginate({}, {
			limit: filters.limit || 10,
			page: filters.page || 1,
			sortBy: filters.sortBy || 'createdAt:desc',
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
		const { gatewayId } = data;
		const gateway = await Gateway.findById(gatewayId);
		if (!gateway) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'The selected gateway is invalid');
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

	async getDevices(filters) {
		return await Device.paginate({}, {
			limit: filters.limit || 10,
			page: filters.page || 1,
			sortBy: filters.sortBy || 'createdAt:desc',
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
}

module.exports = new GatewayService();