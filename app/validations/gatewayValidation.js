const httpStatus = require('http-status');
const isIp = require('is-ip');
const ApiError = require('@app/utils/ApiError');

const createGateway = (req, res, next) => {
	const { name, serialNumber, ipAddress } = req.body;
	let message;

	if (!name || !serialNumber || !ipAddress) {
		message = 'Please provide all required fields (name, serialNumber, ipAddress)';
	}

	if (message) {
		return next(new ApiError(httpStatus.BAD_REQUEST, message));
	}

	return next();
};

const getGateways = (req, res, next) => {
	const params = req.query;
	const allowedParams = ['page', 'limit', 'sortBy'];

	let message;

	for (var key in params) {
		if (allowedParams.indexOf(key) === -1) {
			message = `${key} param is not allowed`;
		}
	}

	// We need to apply more validation to fitlers and pagination params

	if (message) {
		return next(new ApiError(httpStatus.BAD_REQUEST, message));
	}

	return next();
};

module.exports = {
	createGateway,
	getGateways,
}
