'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const importJsx = require('import-jsx')
const Heading = importJsx('./heading')
const { toHumanReadableDate } = require('../../util/datetime')
const { capitalizeText } = require('../../util/text')
const LinkItem = require('./link-item')

const isDataValid = (data) => data && (data.date !== null && data.url !== null)

const HistoryItems = ({ items, title, colors }) => {
	return (
		<>
			<Text inverse color={colors.tertiary}>
				{title}
			</Text>
			{items.map((item, idx) => (
				<LinkItem
					colors={colors}
					key={idx}
					title={`${item.year} - ${item.text}`}
					url={`${item.links && item.links[0] ? item.links[0].link : ''}`}
				/>
			))}
		</>
	)
}

const History = ({ data, colors }) => {
	return (
		<>
			{isDataValid(data) && (
				<>
					<LinkItem colors={colors} title={<Heading colors={colors} text={'On this day'} />} url={data.url} />
					<HistoryItems items={data.data.Events} title={'Events'} colors={colors} />
					<Text>{'\n'}</Text>
					<HistoryItems items={data.data.Births} title={'Births'} colors={colors} />
					<Text>{'\n'}</Text>
					<HistoryItems items={data.data.Deaths} title={'Deaths'} colors={colors} />
				</>
			)}
		</>
	)
}

module.exports = History
