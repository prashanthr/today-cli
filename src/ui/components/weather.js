'use strict'
const React = require('react')
const { Text } = require('ink')
const { isEmpty } = require('lodash')
const Image = require('ink-image')

const Weather = ({ data }) => {
	const { weather, main, visibility, wind } = data
	return (
		<>
			{!isEmpty(data) && (
				<>
				<Text color='white'>
						Today's foecast:&nbsp;
						<Text color='blue'>
							{weather[0].description} (Current: {main.temp}, Min/Max: {main.temp_min}/{main.temp_max}, Feels: {main.feels_like}, 💨: {wind.speed}, 🌫️: {visibility})
						</Text>
				</Text>
				</>
			)}
		</>
	)
}

Weather.defaultProps = {
	data: {}
}


module.exports = Weather
