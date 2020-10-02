'use strict'
const React = require('react')
const PropTypes = require('prop-types')
const importJsx = require('import-jsx')
const { getData, buildInitialState } = require('../api')
const Layout = importJsx('./layout')
const { isEmpty } = require('lodash')

const App = (props) => {
	const [data, setData] = React.useState(buildInitialState(props.resolved));
	React.useEffect(() => {
    const fetchData = async (props) => {
			const result = await getData(props)
			setData(result)
    };
    fetchData(props)
  }, [])
	return (
		<Layout data={data} />
	)
}

App.propTypes = {
	resolved: PropTypes.object,
	original: PropTypes.object
}

module.exports = App
