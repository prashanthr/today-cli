const React = require('react')
const { Text, Newline } = require('ink')
const { getHomeFilePath, CONFIG_FILE_NAME } = require('../../util/file')
const Link = require('ink-link')
const CONSTANTS = require('../../constants')
const { author } = require('../../../package.json')
const colors = require('../../util/colors')
const { RESET_CMD } = require('../../cli/flags')

const Attribution = ({ sources, colors }) => (
	<Text color={colors.primary}>
		{sources.map(({ type, name, url }, index) => (
			<Text color={colors.primary} key={index}>
				{type} from <Link url={url}><Text color={colors.secondary}>{name}</Text></Link>
				{index !== sources.length - 1 && <>,&nbsp;</>}
			</Text>
		))}
		{'\n'}
		Made with 💙 by <Link url={author.url}>{author.name}</Link>. Liked it? <Link url={CONSTANTS.coffeeUrl}>Buy me a coffee</Link>
	</Text>
)

const ConfigNotice = ({ colors }) => (
	<Text color={colors.primary}>
		{'\n'}
		Note: You can view/edit your settings at <Text color={colors.secondary}>{getHomeFilePath(CONFIG_FILE_NAME)}</Text>
		{'\n'}
		Messed up your settings? Try running <Text color={colors.secondary}>{RESET_CMD}</Text>
	</Text>
)

const Footer = ({ colors }) => (
	<>
		<Attribution sources={CONSTANTS.attribution} colors={colors} />
		<ConfigNotice colors={colors} />
	</>
)

module.exports = Footer
