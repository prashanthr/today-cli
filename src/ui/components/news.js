'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const importJsx = require('import-jsx')
const Heading = importJsx('./heading')
const Link = require('ink-link')
const LinkItem = importJsx('./link-item')

const News = ({ data, colors }) => (
	<>
		{data && data.articles && (
			<>
				<Heading text={`Today's Headlines`} colors={colors} />
				{data.articles.map((article, idx) => (
					<LinkItem
						colors={colors}
						key={idx}
						title={`- ${article.title}`}
						url={article.url}
					/>
				))}
			</>
		)}
	</>
)

News.defaultProps = {
}


module.exports = News
