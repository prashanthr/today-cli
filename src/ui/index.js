'use strict'
const React = require('react')
const { Text, Box } = require('ink')
const getData = require('../api')

const App = ({ name = 'Stranger' }) => {
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setData(result);
    };
    fetchData();
  }, []);
	return (
		<>
		<Text>
			Hello, <Text color="green">{name}</Text>
		</Text>
		<Text color='red'>
			{data && data.qod ? JSON.stringify(data.qod[0].author) : ''}
		</Text>
		</>
	)
};

module.exports = App;
