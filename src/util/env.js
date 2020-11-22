const { get, set } = require('lodash')
const getEnv = (key, defaultValue) => get(process.env, key, defaultValue)
const setEnv = (key, value) => set(process.env, key, value)
const getNodeEnv = () => getEnv('NODE_ENV', 'development')
const getTodayEnv = () => getEnv('TODAY_ENV', 'production')
const isProd = () => getNodeEnv().toLowerCase() === 'production'
const isLocalDevMode = () => getTodayEnv().toLowerCase() === 'development'

module.exports = { isProd, getEnv, setEnv, isLocalDevMode }
