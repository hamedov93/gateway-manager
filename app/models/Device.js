const mongoose = require('mongoose');

// Peripheral device schema
const DeviceSchema = new mongoose.Schema({
	uid: Number,
	vendor: String,
	dateCreated: Date,
	status: {
		type: String,
		enum: ['online', 'offline'],
		default: 'online',
	},
	gateway: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Gateway',
	},
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
