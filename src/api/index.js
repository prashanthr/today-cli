const axios = require('axios')
const { get, isNil, omit, isEqual } = require('lodash')
const { isProd, getEnv } = require('../util/env')
const { CONFIG_FILE_NAME, getHomeFilePath, writeToFile, readFromFile } = require('../util/file')
const { getLocationFromIp } = require('../util/location')
const { IGNORE_FLAGS } = require('../cli/flags')

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

const getDataUrl = (params) => {
	const { weatherUnit, historyLimit, newsLimit, country, location } = params
	const baseUrl = isProd()
		? getEnv('TODAY_API_HOST')
		: `http://${getEnv('TODAY_API_HOST')}:${getEnv('TODAY_API_PORT')}`
	return `${baseUrl}/today?location=${encodeURIComponent(location)}&country=${country}&wod_unit=${weatherUnit}&hod_limit=${historyLimit}&nod_limit=${newsLimit}`
}

const getData = async (params) => {
	try {
		const configFilePath = getHomeFilePath(CONFIG_FILE_NAME)
		const readParams = await readFromFile(configFilePath, true)
		const resolvedInputParams = omit(params, IGNORE_FLAGS)
		const getResolvedLocation = async (inputLocation) => {
			const locationFromIp = await getLocationFromIp()
			// return locationFromIp === inputLocation ? locationFromIp : inputLocation
			return locationFromIp || inputLocation
		}
		const resolvedParams = (
			isNil(readParams) ||
			params.reset ||
			!isEqual(readParams, resolvedInputParams)
		) ? {
					...resolvedInputParams,
					location: await getResolvedLocation(resolvedInputParams.location)
				}
			: readParams
		const res = await axios.get(getDataUrl(resolvedParams))
		await writeToFile(resolvedParams, configFilePath)
		return adaptDataForClient({ initData: resolvedParams, data: res.data })
	} catch (err) {
		console.error('Error fetching data from source', err)
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
	return finalData
}

module.exports = { buildInitialState, getData, getUserName }
