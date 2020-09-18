const axios = require('axios')
const { get } = require('lodash')
const { isProd, getEnv } = require('../util/env')
const fs = require('fs')

const weatherIconFolder = '/tmp/today'
const weatherIconPath = `${weatherIconFolder}/weather.png`

const getDataUrl = () => {
	const baseUrl = isProd()
		? getEnv('TODAY_API_HOST')
		: `http://${getEnv('TODAY_API_HOST')}:${getEnv('TODAY_API_PORT')}`
	return `${baseUrl}/today?hod_limit=1&nod_limit=1`
}

const downloadFile = async (url, path) => {
	const res = await axios({
    method: 'get',
    url,
    responseType: 'stream'
	})

	// console.log('url', url, 'res', res)
	const writer = fs.createWriteStream(path)
	// await fs.promises.mkdir(weatherIconFolder)

	res.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
	})

	// await res.data.pipe(
	// 	fs.createWriteStream(path)
	// )

}

const getData = async () => {
	try {
		const res = await axios.get(getDataUrl())
		const weatherIcon = get(res.data, 'wod.weather[0].icon', undefined)
		if (weatherIcon) {
			await downloadFile(weatherIcon, weatherIconPath)
		}
		// console.log('res', res, res.data)
		return adaptDataForClient(res.data)
	} catch (err) {
		console.error('Error fetching data', err)
		return {}
	}
}

const adaptDataForClient = (data) => {
	const finalData = {
		...data,
		qod: get(data, 'qod[0]', {}),
		wod: {
			...data.wod,
			weather: [{
				...data.wod.weather[0],
				icon: weatherIconPath
			}]
		}
	}
	// console.log('finalData', JSON.stringify(finalData), finalData.wod.weather[0].icon)
	return finalData
}

module.exports = getData
