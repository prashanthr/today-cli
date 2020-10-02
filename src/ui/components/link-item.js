const React = require('react')
const { Text } = require('ink')
const Link = require('ink-link')

const LinkItem = ({ title, url, linkText, colors }) => (
	<>
		<Text color={colors.primary}>
			{title}&nbsp;
			<Text color={colors.primary}>
				[
					<Link url={url}>
						<Text color={colors.secondary}>{linkText || 'Link'}</Text>
					</Link>
				]
			</Text>
		</Text>
	</>
)

module.exports = LinkItem
