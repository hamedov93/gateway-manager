const mongoose = require('mongoose');
const isIp = require('is-ip');

const GatewaySchema = new mongoose.Schema({
	serialNumber: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	ipAddress: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (!isIp(value)) {
				throw new Error('The provided ip address is invalid');
			}
		},
	},
}, {
	timestamps: true,
});

GatewaySchema.statics.serialNumberExists = async function(serialNumber, exclude) {
  const gateway = await this.findOne({ serialNumber, _id: { $ne: exclude } });
  return !!gateway;
};

const Gateway = mongoose.model('Gateway', GatewaySchema);

module.exports = Gateway;
