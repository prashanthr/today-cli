const { getUserName } = require('../api')
const { getCountry, getLocationFromTZ } = require('../util/location')
const { getEnv } = require('../util/env')

const flags = {
	name: {
		type: 'string',
		alias: 'n',
		default: getUserName(),
		isRequired: false,
		helpText: `--n | --name jane [default: ${getUserName()}] -- Sets a custom username`
	},
	location: {
		type: 'string',
		alias: 'l',
		default: getLocationFromTZ(),
		isRequired: true,
		helpText: `--l | --location [default: ${getLocationFromTZ()}] -- Sets the location which is derived from your IP address or device timezone`
	},
	country: {
		type: 'string',
		alias: 'c',
		default: getCountry(),
		isRequired: true,
		helpText: `--c | --country [default: ${getCountry()}] -- Sets the country which is derived from your device timezone `
	},
	showWeather: {
		type: 'boolean',
		alias: 'w',
		default: true,
		isRequired: false,
		helpText: `--w | --showWeather [default: true] -- Controls display of weather information`
	},
	showNews: {
		type: 'boolean',
		alias: 'news',
		default: true,
		isRequired: false,
		helpText: `--news | --showNews [default: true] -- Controls display of news articles`
	},
	showHistory: {
		type: 'boolean',
		alias: 'h',
		default: true,
		isRequired: false,
		helpText: `--h | --showHistory [default: true] -- Controls display of history table`
	},
	showQuote: {
		type: 'boolean',
		alias: 'q',
		default: true,
		isRequired: false,
		helpText: `--q | --showQuote [default: true] -- Controls display of quote`
	},
	showSong: {
		type: 'boolean',
		alias: 's',
		default: true,
		isRequired: false,
		helpText: `--s | --showSong [default: true] -- Controls display of song`
	},
	weatherUnit: {
		type: 'string',
		alias: 'wu',
		default: 'imperial',
		isRequired: false,
		helpText: `--wu | --weatherUnit [default: imperial, valid: metric,standard,imperial] -- Controls the weather units`
	},
	historyLimit: {
		type: 'number',
		alias: 'hlimit',
		default: 3,
		isRequired: false,
		helpText: `--hlimit | --historyLimit [default: 3] -- Controls the number of historical datapoints shown`
	},
	newsLimit: {
		type: 'number',
		alias: 'nlimit',
		default: 5,
		isRequired: false,
		helpText: `--nlimit | --newsLimit [default: 5] -- Controls the number of news articles shown`
	},
	reset: {
		type: 'boolean',
		alias: 'r',
		default: false,
		isRequired: false,
		helpText: `--reset | --r [default: false] -- Removes any saved settings and uses defaults`
	},
	debug: {
		type: 'boolean',
		alias: 'd',
		default: getEnv('TODAY_DEBUG', 'false') === 'true',
		isRequired: false,
		helpText: `--debug | --d [default: false] -- Logs to the console`
	},
	colorPrimary: {
		type: 'string',
		alias: 'cp',
		default: 'white',
		isRequired: false,
		helpText: `--colorPrimary | --cp [default: 'white'] -- Sets the primary color (hex or valid chalk color name. See https://github.com/chalk/chalk#colors)`
	},
	colorSecondary: {
		type: 'string',
		alias: 'cs',
		default: 'blue',
		isRequired: false,
		helpText: `--colorSecondary | --cs [default: 'blue'] -- Sets the secondary color (hex or valid chalk color name. See https://github.com/chalk/chalk#colors)`
	},
	colorTertiary: {
		type: 'string',
		alias: 'ct',
		default: 'green',
		isRequired: false,
		helpText: `--colorTertiary | --ct [default: 'green'] -- Sets the tertiary color (hex or valid chalk color name. See https://github.com/chalk/chalk#colors)`
	},
	colorError: {
		type: 'string',
		alias: 'ce',
		default: 'red',
		isRequired: false,
		helpText: `--colorError | --ce [default: 'red'] -- Sets the error color (hex or valid chalk color name. See https://github.com/chalk/chalk#colors)`
	}
}

const IGNORE_FLAGS = ['reset', 'help', 'version', 'debug']
const RESET_CMD = 'today --reset'
const EXAMPLES = `
		$ today --location="san francisco,usa"
		$ today --weatherUnit="imperial"
		$ today --country="uk"
		$ today --newsLimit=10 --historyLimit=5
		$ today --colorSecondary="cyan"
		$ ${RESET_CMD}
`

module.exports = { flags, IGNORE_FLAGS, EXAMPLES, RESET_CMD }
