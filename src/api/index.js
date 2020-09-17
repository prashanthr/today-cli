const axios = require('axios')
const { isProd, getEnv } = require('../util/env')

const getData = async () => {
	const baseUrl = isProd()
		? getEnv('TODAY_API_HOST')
		: `http://${getEnv('TODAY_API_HOST')}:${getEnv('TODAY_API_PORT')}`
	const url = `${baseUrl}/today`
	console.log('url', url)
	const res = await axios.get(url)
	console.log('res', res, res.data)
	return res.data
}

module.exports = getData
