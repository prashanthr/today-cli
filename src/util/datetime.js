const toHumanReadableDate = (
	date,
	options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
}) => {
 	return new Intl.DateTimeFormat('en-US', options).format(date)
}

const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

module.exports = { toHumanReadableDate, getTimeZone }
