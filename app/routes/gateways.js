const express = require('express');
const router = express.Router();

const { gatewayValidation, deviceValidation } = require('@app/validations');
const gatewayController = require('@app/controllers/GatewayController');

router.route('/')
	.post(gatewayValidation.createGateway, gatewayController.createGateway)
	.get(gatewayValidation.getGateways, gatewayController.getGateways);

router.route('/:id')
	.get(gatewayController.getGateway)
	.put(gatewayValidation.createGateway, gatewayController.updateGateway)
	.delete(gatewayController.deleteGateway);

module.exports = router;
