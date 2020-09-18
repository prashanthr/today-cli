'use strict'
const React = require('react')
const { Text } = require('ink')

const Intro = ({ name }) => (
	<>
		{name && (
			<Text color='blue'>
					Hello, {name}
			</Text>
		)}
	</>
)

Intro.defaultProps = {
	name: 'Stranger'
}


module.exports = Intro
