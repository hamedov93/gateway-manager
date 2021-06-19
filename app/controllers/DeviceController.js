const httpStatus = require('http-status');
const gatewayService = require('@services/GatewayService');
const catchAsync = require('@app/utils/catchAsync');
const ApiError = require('@app/utils/ApiError');

const getDevices = catchAsync(async (req, res) => {
	const devices = await gatewayService.getDevices(req.query);
	res.send(devices);
});

const getDevice = catchAsync(async (req, res) => {
	const id = req.params.id;
	const device = await gatewayService.getDevice(id);

	if (!device) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
	}

	res.send(device);
});

const createDevice = catchAsync(async (req, res) => {
	const device = await gatewayService.createDevice(req.body);
	res.status(httpStatus.CREATED).send(device);
});

const updateDevice = catchAsync(async (req, res) => {
	const device = await gatewayService.updateDevice(req.params.id, req.body);
	res.send(device);
});

const deleteDevice = catchAsync(async (req, res) => {
	await gatewayService.deleteDevice(req.params.id);
	res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
	getDevices,
	getDevice,
	createDevice,
	updateDevice,
	deleteDevice,
};
