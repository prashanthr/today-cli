const axios = require('axios')
const { get, isNil, omit, isEqual, isEmpty, omitBy, mapValues } = require('lodash')
const { isProd, getEnv } = require('../util/env')
const { CONFIG_FILE_NAME, getHomeFilePath, writeToFile, readFromFile } = require('../util/file')
const { getLocationFromIp, getLocationFromTZ } = require('../util/location')

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

const getResolvedFlags = async ({ inputFlags, defaultFlags, savedFlags }) => {
	// console.log('savedFlags', savedFlags, 'inputFlags', inputFlags, 'defaultFlags', defaultFlags)
	const ignoreSaved = inputFlags.reset || isNil(savedFlags) || isEmpty(savedFlags)
	if (isEqual(inputFlags, defaultFlags)) {
		if (ignoreSaved) {
			return {
				...inputFlags,
				location: await getLocationFromIp() || inputFlags.location
			}
		} else {
			return savedFlags
		}
	} else {
		if (ignoreSaved) {
			return {
				...inputFlags,
				location: (
					inputFlags.location === defaultFlags.location
					? await getLocationFromIp()
					: inputFlags.location
				)
			}
		} else {
			return {
				...savedFlags,
				...omitBy(inputFlags, (val, key) => defaultFlags[key] === val)
			}
		}
	}
}

const getData = async ({ resolved, original }) => {
	try {
		const resolvedParams = omit(
			await getResolvedFlags({
				inputFlags: resolved,
				defaultFlags: mapValues({ ...original }, val => val.default),
				savedFlags: await readFromFile(
					getHomeFilePath(CONFIG_FILE_NAME),
					true
				)
			}),
			require('../cli/flags').IGNORE_FLAGS
		)
		console.log('resolvedP', resolvedParams)
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
