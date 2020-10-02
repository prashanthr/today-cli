'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const { isEmpty } = require('lodash')

const Weather = ({ data, colors }) => {
	const { weather, main, visibility, wind, name, sys } = data
	return (
		<>
			{!isEmpty(data) && (
				<>
				<Text color={colors.primary}>
						Today's foecast (for <Text bold color={colors.secondary}>{name}, {sys.country}</Text>):&nbsp;
						{'\n'}
						<Text bold color={colors.tertiary}>
							{weather[0].description}&nbsp;
						</Text>
						<Text>
							(Current: <Text color={colors.secondary}>{main.temp}</Text>, Feels: <Text color={colors.secondary}>{main.feels_like}</Text>, Min/Max: <Text color={colors.secondary}>{main.temp_min}</Text>/<Text color={colors.secondary}>{main.temp_max}</Text>, 💨: <Text color={colors.secondary}>{wind.speed}</Text>, 🌫️: <Text color={colors.secondary}>{visibility}</Text>)
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
