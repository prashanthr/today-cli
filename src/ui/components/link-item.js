const React = require('react')
const { Text } = require('ink')
const Link = require('ink-link')

const LinkItem = ({ title, url, linkText }) => (
	<React.Fragment>
		<Text>
			{title}&nbsp;
			<Text>
				[
					<Link url={url}>
						<Text color='blue'>{linkText || 'Link'}</Text>
					</Link>
				]
			</Text>
		</Text>
	</React.Fragment>
)

module.exports = LinkItem
