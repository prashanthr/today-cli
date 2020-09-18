'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { getData, initialState } = require('../api')
const Layout = importJsx('./layout')

const App = ({ name = 'Stranger' }) => {
	const [data, setData] = React.useState(initialState);
	React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setData(result);
    };
    fetchData();
  }, [])
	return (
		<Layout data={data} />
	)
}

module.exports = App
