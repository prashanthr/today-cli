const { get } = require('lodash')
const getEnv = (key, defaultValue) => get(process.env, key, defaultValue)
const getNodeEnv = () => getEnv('NODE_ENV', 'development')
const isProd = () => getNodeEnv().toLowerCase === 'production'

module.exports = { isProd, getEnv }
