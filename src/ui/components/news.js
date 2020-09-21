'use strict'
const React = require('react')
const { Text, Newline } = require('ink')
const Link = require('ink-link')

const News = ({ data }) => (
	<>
		{data.articles && (
			<>
				<Text bold underline>Today's Headlines</Text>
				{data.articles.map((article, idx) => (
					<React.Fragment key={idx}>
						<Text>
							{article.title}&nbsp;
							<Text>
								[
									<Link url={article.url}>
										<Text color='blue'>Link</Text>
									</Link>
								]
							</Text>
						</Text>
					</React.Fragment>
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
