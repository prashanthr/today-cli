const axios = require('axios')
const { get, isNil, omit, isEqual, isEmpty, omitBy, mapValues } = require('lodash')
const { isProd, getEnv } = require('../util/env')
const { CONFIG_FILE_NAME, getHomeFilePath, writeToFile, readFromFile } = require('../util/file')
const { getLocationFromIp, getLocationFromTZ } = require('../util/location')
const debug = require('../util/debug')
const { getColorProperties } = require('../util/colors')

const getUserName = () => getEnv('USER', 'Stranger')

const initialState = {
	name: getUserName(),
	isLoading: true,
	colors: {},
	error: false
}

const buildInitialState = (data) => {
	return {
		...initialState,
		...data
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
	let resolvedParams = {}
	try {
		const configFilePath = getHomeFilePath(CONFIG_FILE_NAME)
		resolvedParams = omit(
			await getResolvedFlags({
				inputFlags: resolved,
				defaultFlags: mapValues({ ...original }, val => val.default),
				savedFlags: await readFromFile(
					configFilePath,
					true
				)
			}),
			require('../cli/flags').IGNORE_FLAGS
		)
		debug('Using flags', resolvedParams)
		const res = await axios.get(getDataUrl(resolvedParams))
		await writeToFile(resolvedParams, configFilePath)
		return adaptDataForClient({ initData: resolvedParams, data: res.data })
	} catch (err) {
		debug('Error fetching data from source', err)
		return {
			...buildInitialState(resolvedParams),
			colors: getColorProperties(resolvedParams),
			isLoading: false,
			error: true,
			errorMessage: 'Oops. Unable to get data at this time :( Try again later!'
		}
	}
}

const adaptDataForClient = ({ initData, data }) => {
	const finalData = {
		...buildInitialState(initData),
		colors: getColorProperties(initData),
		...data,
		isLoading: false,
		error: false,
		qod: get(data, 'qod[0]', {})
	}
	return finalData
}

module.exports = { buildInitialState, getData, getUserName }
