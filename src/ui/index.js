'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const getData = require('../api')
const Layout = importJsx('./layout')

const App = ({ name = 'Stranger' }) => {
	const [data, setData] = React.useState({});
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
