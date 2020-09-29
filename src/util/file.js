const { getEnv } = require('./env');
const fs = require('fs').promises;
const path = require('path')

const CONFIG_FILE_NAME = '.today.json'

const getHomeFilePath = (fileName) => {
	return path.resolve(getEnv('HOME'), fileName)
}

const readFromFile = async (path, json = false) => {
	try {
		const contents = await fs.readFile(path);
		return json
			? JSON.parse(contents)
			: contents
	} catch (err) {
		return undefined
	}
}

const writeToFile = async (data, path) => {
	await fs.writeFile(path, typeof data === 'string' ? data : JSON.stringify(data))
}

module.exports = { writeToFile, readFromFile, getHomeFilePath, CONFIG_FILE_NAME }
