
module.exports = {
	port: process.env.APP_PORT || 3000,
	env: process.env.NODE_ENV,
	mongo: {
		url: 'mongodb://mongo:27017/gateway_manager' + (process.env.NODE_ENV === 'test' ? '-test' : ''),
	    options: {
	      useCreateIndex: true,
	      useNewUrlParser: true,
	      useUnifiedTopology: true,
	    },
	},
}
