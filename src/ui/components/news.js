'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const importJsx = require('import-jsx')
const Heading = importJsx('./heading')
const Link = require('ink-link')
const LinkItem = importJsx('./link-item')

const News = ({ data }) => (
	<>
		{data.articles && (
			<>
				<Heading text={`Today's Headlines`} />
				{data.articles.map((article, idx) => (
					<LinkItem
						key={idx}
						title={article.title}
						url={article.url}
					/>
				))}
			</>
		)}
	</>
)

News.defaultProps = {
	data: {
		articles: []
	}
}


module.exports = News
