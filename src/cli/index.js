#!/usr/bin/env node
'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')
const flags = require('./flags')
const { mapValues } = require('lodash')

const ui = importJsx('../ui')

const cli = meow(`
	Usage
	  $ today

	Options
		--name  Your name

	Examples
	  $ today --name=Jane
	  Hello, Jane
`, { flags })

render(React.createElement(ui, cli.flags))
