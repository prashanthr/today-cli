const axios = require('axios')
const { get } = require('lodash')
const { isProd, getEnv } = require('../util/env')
const { CONFIG_FILE_NAME, getHomeFilePath, writeToFile, readFromFile } = require('../util/file')
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

const getDataUrl = (params = {}) => {
	const { weatherUnit, historyLimit, newsLimit, country, location } = params
	const baseUrl = isProd()
		? getEnv('TODAY_API_HOST')
		: `http://${getEnv('TODAY_API_HOST')}:${getEnv('TODAY_API_PORT')}`
	return `${baseUrl}/today?location=${encodeURIComponent(location)}&country=${country}&wod_unit=${weatherUnit}&hod_limit=${historyLimit}&nod_limit=${newsLimit}`
}

const getData = async (params) => {
	try {
		const configFilePath = getHomeFilePath(CONFIG_FILE_NAME)
		const readParams = await readFromFile(configFilePath)
		const resolvedParams = readParams || {
			...params,
			location: await getLocationFromIp() || params.location
		}
		const res = await axios.get(getDataUrl(resolvedParams))
		await writeToFile(resolvedParams, configFilePath)
		return adaptDataForClient({ initData: resolvedParams, data: res.data })
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
