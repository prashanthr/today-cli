const React = require('react')
const { Text } = require('ink')

const Error = ({ message }) => (
	<>
		<Text	color='red' inverse>
			{message}
		</Text>
	</>
)

module.exports = Error
