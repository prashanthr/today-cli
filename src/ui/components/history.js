'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const importJsx = require('import-jsx')
const Heading = importJsx('./heading')
const { toHumanReadableDate } = require('../../util/date')
const { capitalizeText } = require('../../util/text')
const LinkItem = require('./link-item')

const HistoryItems = ({ items, title }) => {
	return (
		<>
			<Text inverse color='green'>
				{title}
			</Text>
			{items.map((item, idx) => (
				<LinkItem
					key={idx}
					title={`${item.year} - ${item.text}`}
					url={`${item.links && item.links[0] ? item.links[0].link : ''}`}
				/>
			))}
		</>
	)
}

const History = ({ data }) => {
	return (
		<>
			{data && (
				<>
					<LinkItem title={<Heading text={'On this day'} />} url={data.url} />
					<HistoryItems items={data.data.Events} title={'Events'} />
					<Text>{'\n'}</Text>
					<HistoryItems items={data.data.Births} title={'Births'} />
					<Text>{'\n'}</Text>
					<HistoryItems items={data.data.Deaths} title={'Deaths'} />
				</>
			)}
		</>
	)
}

History.defaultProps = {
}


module.exports = History
