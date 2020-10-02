const { getEnv } = require('./env')

const debug = (...data) => {
	if (getEnv('TODAY_DEBUG', 'false') === 'true') {
		console.log(...data)
	}
}

module.exports = debug
