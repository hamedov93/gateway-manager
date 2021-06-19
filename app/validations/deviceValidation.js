const httpStatus = require('http-status');
const ApiError = require('@app/utils/ApiError');

const createDevice = (req, res, next) => {
	const { uid, vendor, status } = req.body;
	let message;

	if (!uid || !vendor || !status) {
		message = 'Please provide all required fields (uid, vendor, status)';
	}

	if (message) {
		return next(new ApiError(httpStatus.BAD_REQUEST, message));
	}

	return next();
};

const getDevices = (req, res, next) => {
	const params = req.query;
	const allowedParams = ['page', 'limit', 'sortBy', 'gatewayId'];

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
	createDevice,
	getDevices,
}
