'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const { isEmpty } = require('lodash')

const Weather = ({ data }) => {
	const { weather, main, visibility, wind, name, sys } = data
	return (
		<>
			{!isEmpty(data) && (
				<>
				<Text color='white'>
						Today's foecast (for <Text bold color='blue'>{name}, {sys.country}</Text>):&nbsp;
						{'\n'}
						<Text bold color='green'>
							{weather[0].description}&nbsp;
						</Text>
						<Text>
							(Current: <Text color='blue'>{main.temp}</Text>, Feels: <Text color='blue'>{main.feels_like}</Text>, Min/Max: <Text color='blue'>{main.temp_min}</Text>/<Text color='blue'>{main.temp_max}</Text>, 💨: <Text color='blue'>{wind.speed}</Text>, 🌫️: <Text color='blue'>{visibility}</Text>)
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
