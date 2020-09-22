'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { Box, Newline } = require('ink')
const Intro = importJsx('./components/intro')
const Weather = importJsx('./components/weather')
const Quote = importJsx('./components/quote')
const News = importJsx('./components/news')
const History = importJsx('./components/history')

const Layout = ({ data }) => {
	const { qod, name } = data
	const components = [
		<Intro name={data.name} />,
		<Weather data={data.wod} />,
		<News data={data.nod} />,
		<History data={data.hod} />,
		<Quote data={data.qod} />
	]
	return (
		<>
			{components.map((component, idx) => (
				<React.Fragment key={idx}>
					{component}
					<Newline />
				</React.Fragment>
			))}
		</>
	)
}

module.exports = Layout
