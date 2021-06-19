const express = require('express');
const router = express.Router();

const { deviceValidation } = require('@app/validations');
const deviceController = require('@app/controllers/DeviceController');

router.route('/')
	.post(deviceValidation.createDevice, deviceController.createDevice)
	.get(deviceValidation.getDevices, deviceController.getDevices);

router.route('/:id')
	.get(deviceController.getDevice)
	.put(deviceValidation.createDevice, deviceController.updateDevice)
	.delete(deviceController.deleteDevice);

module.exports = router;
