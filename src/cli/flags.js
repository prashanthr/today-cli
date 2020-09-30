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
}

module.exports = flags
