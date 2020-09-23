'use strict'
const React = require('react')
const { Text, Newline, Static } = require('ink')
const { toHumanReadableDate } = require('../../util/date')
const { capitalizeText } = require('../../util/text')

const Intro = ({ name }) => (
	<>
		{name && (
			<>
				<Text>
						Hello, <Text bold color='blue'>{capitalizeText(name)}</Text> 👋
						{'\n'}
				</Text>
				<Text color='white'>
					Today is <Text bold color='blue'>{toHumanReadableDate(new Date())}</Text>
				</Text>
			</>
		)}
	</>
)

Intro.defaultProps = {
	name: 'Stranger'
}

const StaticIntro = ({ data }) => (
	<Static items={[data]}>
		{(item, idx) => (
			<Intro key={idx} name={item.name} />
		)}
	</Static>
)

module.exports = StaticIntro
