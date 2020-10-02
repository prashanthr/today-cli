const React = require('react')
const { Text } = require('ink')
const Spinner = require('ink-spinner')
const { sample } = require('lodash')

// https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json
const ALL_SPINNER_TYPES = [
	"dots", "dots2", "dots3", "dots4", "dots5", "dots6", "dots7", "dots8", "dots9", "dots10", "dots11", "dots12", "dots8Bit", "line", "line2", "pipe", "simpleDots", "simpleDotsScrolling", "star", "star2", "flip", "hamburger", "growVertical", "growHorizontal", "balloon", "balloon2", "noise", "bounce", "boxBounce", "boxBounce2", "triangle", "arc", "circle", "squareCorners", "circleQuarters", "circleHalves", "squish", "toggle", "toggle2", "toggle3", "toggle4", "toggle5", "toggle6", "toggle7", "toggle8", "toggle9", "toggle10", "toggle11", "toggle12", "toggle13", "arrow", "arrow2", "arrow3", "bouncingBar", "bouncingBall", "smiley", "monkey", "hearts", "clock", "earth", "material", "moon", "runner", "pong", "shark", "dqpb", "weather", "christmas", "grenade", "point", "layer", "betaWave"
]

const Loader = ({ type, preText, postText, colors }) => (
	<>
		<Text color={colors.primary}>
			{preText && ` ${preText}`}
			<Text color={colors.secondary}>
				<Spinner type={'dots'} />
			</Text>
			{postText && ` ${postText}`}
		</Text>
	</>
)

Loader.defaultProps = {
	type: ALL_SPINNER_TYPES[0],
	postText: 'Loading...'
}

const TextLoader = ({ text = 'Loading...', colors }) => (
	<Text color={colors.tertiary}>
		{text}
	</Text>
)

module.exports = TextLoader
