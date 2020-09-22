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
			<Text backgroundColor='green'>
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
	const { data: { Births = [], Deaths = [], Events = [] }, url = '' } = data
	return (
		<>
			{data && (
				<>
					<LinkItem title={<Heading text={'On this day'} />} url={url} />
					<HistoryItems items={Events} title={'Events'} />
					<Text>{'\n'}</Text>
					<HistoryItems items={Births} title={'Births'} />
					<Text>{'\n'}</Text>
					<HistoryItems items={Deaths} title={'Deaths'} />
					<Text>{'\n'}</Text>
				</>
			)}
		</>
	)
}

History.defaultProps = {
	data: {
		date: '',
		url: '',
		data: {
			Events: [],
			Deaths: [],
			Births: []
		}
	}
}


module.exports = History
