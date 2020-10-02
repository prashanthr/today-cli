const { pick } = require("lodash")

const getColorProperties = (data) => {
	return {
		primary: data.colorPrimary,
		secondary: data.colorSecondary,
		tertiary: data.colorTertiary,
		error: data.colorError
	}
}

module.exports = { getColorProperties }
