'use strict'
const React = require('react')
const PropTypes = require('prop-types')
const { Text, Box } = require('ink')

const Quote = ({ data, colors }) => (
	<>
		{data && (
			<Box borderStyle='round' borderColor={colors.tertiary}>
				<Text color={colors.primary}>
					"{data.quote}" - <Text color={colors.secondary}>{data.author}</Text>
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
