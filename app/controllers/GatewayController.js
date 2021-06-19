const httpStatus = require('http-status');
const gatewayService = require('@services/GatewayService');
const catchAsync = require('@app/utils/catchAsync');
const ApiError = require('@app/utils/ApiError');

const getGateways = catchAsync(async (req, res) => {
	const gateways = await gatewayService.getGateways(req.query);
	res.send(gateways);
});

const getGateway = catchAsync(async (req, res) => {
	const id = req.params.id;
	const gateway = await gatewayService.getGateway(id);

	if (!gateway) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Gateway not found');
	}

	res.send(gateway);
});

const createGateway = catchAsync(async (req, res) => {
	const gateway = await gatewayService.createGateway(req.body);
	res.status(httpStatus.CREATED).send(gateway);
});

const updateGateway = catchAsync(async (req, res) => {
	const gateway = await gatewayService.updateGateway(req.params.id, req.body);
	res.send(gateway);
});

const deleteGateway = catchAsync(async (req, res) => {
	await gatewayService.deleteGateway(req.params.id);
	res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
	getGateways,
	getGateway,
	createGateway,
	updateGateway,
	deleteGateway,
};
