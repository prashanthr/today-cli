'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { Box, Newline } = require('ink')
const Intro = importJsx('./components/intro')
const Weather = importJsx('./components/weather')
const Quote = importJsx('./components/quote')
const News = importJsx('./components/news')
const History = importJsx('./components/history')
const Loader = importJsx('./components/loader')
const Footer = importJsx('./components/footer')
const Error = importJsx('./components/error')
const Song = importJsx('./components/song')

const Layout = ({ data }) => {
	const components = [
		<Intro name={data.name} colors={data.colors} />,
		...(data.isLoading ? [<Loader colors={data.colors} />] : []),
		...(!data.isLoading && data.error ? [<Error message={data.errorMessage} colors={data.colors} />] : []),
		...(!data.isLoading && data.showWeather ? [<Weather data={data.wod} colors={data.colors} />] : []),
		...(!data.isLoading && data.showNews ? [<News data={data.nod} colors={data.colors} />] : []),
		...(!data.isLoading && data.showHistory ? [<History data={data.hod} colors={data.colors} />] : []),
		...(!data.isLoading && data.showSong ? [<Song data={data.sod} colors={data.colors} />] : []),
		...(!data.isLoading && data.showQuote ? [<Quote data={data.qod} colors={data.colors} />] : []),
		...(!data.isLoading ? [<Footer colors={data.colors} />] : [])
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
