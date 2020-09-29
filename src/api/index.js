const axios = require('axios')
const { get } = require('lodash')
const { isProd, getEnv } = require('../util/env')
const fs = require('fs')
const { getLocationFromIp } = require('../util/location')

const weatherIconFolder = '/tmp/today'
const weatherIconPath = `${weatherIconFolder}/weather.png`

const getUserName = () => getEnv('USER', 'Stranger')

const initialState = {
	name: getUserName(),
	isLoading: true
}

const buildInitialState = (data) => {
	return {
		...data,
		...initialState
	}
}

const getDataUrl = async (params = {}) => {
	const { weatherUnit, historyLimit, newsLimit, country } = params
	const location = await getLocationFromIp() || params.location
	const baseUrl = isProd()
		? getEnv('TODAY_API_HOST')
		: `http://${getEnv('TODAY_API_HOST')}:${getEnv('TODAY_API_PORT')}`
	return `${baseUrl}/today?location=${encodeURIComponent(location)}&country=${country}&wod_unit=${weatherUnit}&hod_limit=${historyLimit}&nod_limit=${newsLimit}`
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

const getData = async (params) => {
	try {
		const res = await axios.get(await getDataUrl(params))
		const weatherIcon = get(res.data, 'wod.weather[0].icon', undefined)
		if (weatherIcon) {
			await downloadFile(weatherIcon, weatherIconPath)
		}
		// console.log('res', res, res.data)
		return adaptDataForClient({ initData: params, data: res.data })
	} catch (err) {
		console.error('Error fetching data', err)
		return {}
	}
}

const adaptDataForClient = ({ initData, data }) => {
	const finalData = {
		...buildInitialState(initData),
		...data,
		isLoading: false,
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

module.exports = { buildInitialState, getData, getUserName }
