'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { Box, Newline } = require('ink')
const Intro = importJsx('./components/intro')
const Weather = importJsx('./components/weather')
const Quote = importJsx('./components/quote')
const News = importJsx('./components/news')

const Layout = ({ data }) => {
	const { qod, name } = data
	return (
		<>
			<Intro name={data.name} />
			<Newline />
			<Weather data={data.wod} />
			<Newline />
			<News data={data.nod} />
			<Newline />
			<Quote quote={data.qod} />
			<Newline />
		</>
	)
}

module.exports = Layout
