const express = require('express');

const gatewayRoutes = require('./gatewayRoutes');
const deviceRoutes = require('./deviceRoutes');

const router = express.Router();

router.use('/gateways', gatewayRoutes);
router.use('/devices', deviceRoutes);

module.exports = router;