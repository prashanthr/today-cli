const React = require('react')
const { Text, Newline } = require('ink')
const { getHomeFilePath, CONFIG_FILE_NAME } = require('../../util/file')
const Link = require('ink-link')
const CONSTANTS = require('../../constants')
const { author } = require('../../../package.json')

const Attribution = ({ sources }) => (
	<Text>
		Made with 💙 by <Link url={author.url}>{author.name}</Link>.
		{'\n'}
		{sources.map(({ type, name, url }, index) => (
			<Text key={index}>
				{type} from <Link url={url}><Text color='blue'>{name}</Text></Link>
				{index !== sources.length - 1 && <>,&nbsp;</>}
			</Text>
		))}
	</Text>
)

const ConfigNotice = () => (
	<Text>
		Note: You can view/edit your settings at <Text color='blue'>{getHomeFilePath(CONFIG_FILE_NAME)}</Text>
	</Text>
)

const Footer = () => (
	<>
		<ConfigNotice />
		<Attribution sources={CONSTANTS.attribution} />
	</>
)

module.exports = Footer
