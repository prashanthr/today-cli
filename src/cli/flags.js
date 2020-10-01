const { getUserName } = require('../api')
const { getCountry, getLocationFromTZ } = require('../util/location')

const flags = {
	name: {
		type: 'string',
		alias: 'n',
		default: getUserName(),
		isRequired: false
	},
	location: {
		type: 'string',
		alias: 'l',
		default: getLocationFromTZ(),
		isRequired: true,
	},
	country: {
		type: 'string',
		alias: 'c',
		default: getCountry(),
		isRequired: true,
	},
	showWeather: {
		type: 'boolean',
		alias: 'w',
		default: true,
		isRequired: false
	},
	showNews: {
		type: 'boolean',
		alias: 'n',
		default: true,
		isRequired: false
	},
	showHistory: {
		type: 'boolean',
		alias: 'h',
		default: true,
		isRequired: false
	},
	showQuote: {
		type: 'boolean',
		alias: 'q',
		default: true,
		isRequired: false
	},
	weatherUnit: {
		type: 'string',
		alias: 'wu',
		default: 'imperial',
		isRequired: false
	},
	historyLimit: {
		type: 'number',
		alias: 'hlimit',
		default: 3,
		isRequired: false
	},
	newsLimit: {
		type: 'number',
		alias: 'nlimit',
		default: 5,
		isRequired: false
	},
	reset: {
		type: 'boolean',
		alias: 'r',
		default: false,
		isRequired: false
	}
}

module.exports = flags
