const mongoose = require('mongoose');
const ipAddressPlugin = require('mongoose-ip-address');

const GatewaySchema = new mongoose.Schema({
	serialNumber: String,
	name: String,
});

GatewaySchema.plugin(ipAddressPlugin, { fields: ['ipAddress'] });

const Gateway = mongoose.model('Gateway', GatewaySchema);

module.exports = Gateway;
