'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const { toHumanReadableDate } = require('../../util/date')
const { capitalizeText } = require('../../util/text')

const Intro = ({ name }) => (
	<>
		{name && (
			<>
				<Text>
						Hello, <Text color='blue'>{capitalizeText(name)}</Text> 👋
						{'\n'}
				</Text>
				<Text color='white'>
					Today is <Text color='blue'>{toHumanReadableDate(new Date())}</Text>
				</Text>
			</>
		)}
	</>
)

Intro.defaultProps = {
	name: 'Stranger'
}


module.exports = Intro
