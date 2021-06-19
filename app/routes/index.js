const express = require('express');

const gatewayRoutes = require('./gateways');
const deviceRoutes = require('./devices');

const router = express.Router();

router.use('/gateways', gatewayRoutes);
router.use('/devices', deviceRoutes);

module.exports = router;