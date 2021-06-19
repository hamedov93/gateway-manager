const mongoose = require('mongoose');
const { paginate } = require('./plugins');

// Peripheral device schema
const DeviceSchema = new mongoose.Schema({
	uid: {
		type: Number,
		required: true,
	},
	vendor: {
		type: String,
		required: true,
		trim: true,
	},
	status: {
		type: String,
		enum: ['online', 'offline'],
		default: 'online',
		required: true,
	},
	gateway: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Gateway',
		required: true,
	},
}, {
	timestamps: true,
});

DeviceSchema.plugin(paginate);

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
