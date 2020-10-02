const React = require('react')
const { Text } = require('ink')

const Heading = ({ text, colors }) => (
	<Text color={colors.primary} bold underline>
		{text}
	</Text>
)

module.exports = Heading
