'use strict'
const React = require('react')
const { Text, Box } = require('ink')

const Quote = ({ quote }) => (
	<>
		{quote && (
			<Box borderStyle='round' borderColor='green'>
				<Text color='white'>
					"{quote.quote}" - <Text color="blue">{quote.author}</Text>
				</Text>
			</Box>
		)}
	</>
)


module.exports = Quote
