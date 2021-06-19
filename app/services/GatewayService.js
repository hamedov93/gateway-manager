const httpStatus = require('http-status');
const Gateway = require('@models/Gateway');
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
}

module.exports = new GatewayService();