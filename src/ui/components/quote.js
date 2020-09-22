'use strict'
const React = require('react')
const PropTypes = require('prop-types')
const { Text, Box } = require('ink')

const Quote = ({ data }) => (
	<>
		{data && (
			<Box borderStyle='round' borderColor='green'>
				<Text color='white'>
					"{data.quote}" - <Text color="blue">{data.author}</Text>
				</Text>
			</Box>
		)}
	</>
)

Quote.propTypes = {
	data: PropTypes.shape({
		quote: PropTypes.string,
		author: PropTypes.string
	})
}


module.exports = Quote
