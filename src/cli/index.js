#!/usr/bin/env node
'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')
const { flags, EXAMPLES } = require('./flags')
const { values } = require('lodash')

const ui = importJsx('../ui')

const cli = meow(`
	Usage
	  $ today

	Options
		${values(flags).map(flag => flag.helpText).join('\n       ')}

	Examples
		${EXAMPLES}
`, { flags })

render(React.createElement(ui, { resolved: cli.flags, original: flags } ))
