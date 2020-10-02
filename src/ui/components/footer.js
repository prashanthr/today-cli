const React = require('react')
const { Text, Newline } = require('ink')
const { getHomeFilePath, CONFIG_FILE_NAME } = require('../../util/file')
const Link = require('ink-link')
const CONSTANTS = require('../../constants')
const { author } = require('../../../package.json')
const colors = require('../../util/colors')

const Attribution = ({ sources, colors }) => (
	<Text color={colors.primary}>
		{sources.map(({ type, name, url }, index) => (
			<Text color={colors.primary} key={index}>
				{type} from <Link url={url}><Text color={colors.secondary}>{name}</Text></Link>
				{index !== sources.length - 1 && <>,&nbsp;</>}
			</Text>
		))}
		{'\n'}
		Made with 💙 by <Link url={author.url}>{author.name}</Link>.
	</Text>
)

const ConfigNotice = ({ colors }) => (
	<Text color={colors.primary}>
		Note: You can view/edit your settings at <Text color={colors.secondary}>{getHomeFilePath(CONFIG_FILE_NAME)}</Text>
	</Text>
)

const Footer = ({ colors }) => (
	<>
		<ConfigNotice colors={colors} />
		<Attribution sources={CONSTANTS.attribution} colors={colors} />
	</>
)

module.exports = Footer
