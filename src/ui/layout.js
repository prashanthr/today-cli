'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const Quote = importJsx('./components/quote')
const Intro = importJsx('./components/intro')

const Layout = ({ data }) => {
	const { qod, name } = data
	return (
		<>
			<Intro name={data.name} />
			<Quote quote={data.qod} />
		</>
	)
}

module.exports = Layout
