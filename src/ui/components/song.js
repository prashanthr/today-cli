'use strict'
const React = require('react')
const PropTypes = require('prop-types')
const importJsx = require('import-jsx')
const { Text, Box } = require('ink')
const Link = require('ink-link')
const Heading = importJsx('./heading')
const LinkItem = importJsx('./link-item')
const { capitalizeText } = require('../../util/text')

/**
 * @param {*} data {
        "artist_name": null,
        "source": null,
        "track_name": null,
        "uri": null
    }
 * @returns boolean
 */
const isDataValid = (data) => data && data.uri

const Song = ({ data, colors }) => (
	<>
		{isDataValid(data) && (
			<>
				<Heading text={`Song of the day`} colors={colors} />
				<LinkItem
					title={
							<Text color={colors.primary}>
								<Text color={colors.secondary}>{data.track_name}</Text>
								&nbsp;by <Text color={colors.primary}>{data.artist_name}</Text>
								&nbsp;on <Text color={colors.tertiary}>{capitalizeText(data.source)}</Text>
							</Text>
					}
					url={data.uri}
					linkText={'Listen'}
					colors={colors}
				/>
			</>
		)}
	</>
)

Song.propTypes = {
	data: PropTypes.shape({
		artist_name: PropTypes.string,
		track_name: PropTypes.string,
		uri: PropTypes.string,
		source: PropTypes.string
	})
}


module.exports = Song
