'use strict'
const React = require('react')
const { Text, Box } = require('ink')
const getData = require('../api')

const App = ({ name = 'Stranger' }) => {
	const [data, setData] = React.useState({});
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
			Hello, <Text color='green'>{name}</Text>
		</Text>
		{data.qod && (
			<Box borderStyle='round' borderColor='green'>
				<Text color='white'>
					"{data.qod[0].quote}" - <Text color="blue">{data.qod[0].author}</Text>
				</Text>
			</Box>
		)}
		</>
	)
};

module.exports = App;
