'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const { toHumanReadableDate } = require('../../util/datetime')
const { capitalizeText } = require('../../util/text')

const Intro = ({ name, colors }) => (
	<>
		{name && (
			<>
				<Text color={colors.primary}>
						Hello, <Text bold color={colors.secondary}>{capitalizeText(name)}</Text> 👋
						{'\n'}
				</Text>
				<Text color={colors.primary}>
					Today is <Text bold color={colors.secondary}>{toHumanReadableDate(new Date())}</Text>
				</Text>
			</>
		)}
	</>
)

Intro.defaultProps = {
	name: 'Stranger',
	colors: {}
}

module.exports = Intro
