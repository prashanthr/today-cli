const { get, set } = require('lodash')
const getEnv = (key, defaultValue) => get(process.env, key, defaultValue)
const setEnv = (key, value) => set(process.env, key, value)
const getNodeEnv = () => getEnv('NODE_ENV', 'development')
const isProd = () => getNodeEnv().toLowerCase === 'production'

module.exports = { isProd, getEnv, setEnv }
