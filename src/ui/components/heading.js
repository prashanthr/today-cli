const React = require('react')
const { Text } = require('ink')

const Heading = ({ text }) => (
	<Text bold underline>
		{text}
	</Text>
)

module.exports = Heading
