#!/usr/bin/env node
'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')
const { values } = require('lodash')
const { flags, EXAMPLES } = require('./flags')
const { setEnv } = require('../util/env')

const ui = importJsx('../ui')

const cli = meow(`
	Usage
	  $ today

	Options
		${values(flags).map(flag => flag.helpText).join('\n       ')}

	Examples
		${EXAMPLES}
`, { flags })

setEnv('TODAY_DEBUG', cli.flags.debug.toString())

render(React.createElement(ui, { resolved: cli.flags, original: flags } ))
