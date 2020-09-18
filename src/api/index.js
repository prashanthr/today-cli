const axios = require('axios')
const { get } = require('lodash')
const { isProd, getEnv } = require('../util/env')

const getDataUrl = () => {
	const baseUrl = isProd()
		? getEnv('TODAY_API_HOST')
		: `http://${getEnv('TODAY_API_HOST')}:${getEnv('TODAY_API_PORT')}`
	return `${baseUrl}/today`
}
const getData = async () => {
	try {
		const res = await axios.get(getDataUrl())
		// console.log('res', res, res.data)
		return adaptDataForClient(res.data)
	} catch (err) {
		console.error('Error fetching data', err)
		return {}
	}
}

const adaptDataForClient = (data) => {
	return {
		...data,
		qod: get(data, 'qod[0]', {})
	}
}

module.exports = getData
