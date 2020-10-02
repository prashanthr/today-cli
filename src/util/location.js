const { getTimeZone } = require('./datetime')
const axios = require('axios')
const debug = require('./debug')

const getCityFromTZ = () => {
	const tz = getTimeZone().toLowerCase()
	const resolved = tz.includes('/')
		? tz.substring(tz.indexOf('/') + 1, tz.length)
		: tz
	return resolved.replace('_', ' ')
}

const getCityFromIp = async () => {
	let city
	try {
		const res = await axios.get('https://ipinfo.io')
		city = res.data.city.toLowerCase()
	} catch (err) {
		debug('Error getting ip address', err)
	} finally {
		return city
	}
}

const getCountry = () => {
	const tz = getTimeZone().toLowerCase()
	if (tz.includes('/')) {
		return tz.substring(0, tz.indexOf('/'))
	} else {
		return tz
	}
}

const getLocationFromTZ = () => {
	return `${getCityFromTZ()},${getCountry()}`
}

const getLocationFromIp = async () => {
	return `${await getCityFromIp()},${getCountry()}`
}

module.exports = { getCityFromIp, getCityFromTZ, getCountry, getLocationFromIp, getLocationFromTZ }
