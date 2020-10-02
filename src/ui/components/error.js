const React = require('react')
const { Text } = require('ink')

const Error = ({ message, colors }) => (
	<>
		<Text	color={colors.error} inverse>
			{message}
		</Text>
	</>
)

module.exports = Error
