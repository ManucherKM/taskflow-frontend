/**
 * Function for formatting the date into DD:MM:YYY format
 *
 * @param date The date based on which formatting should be done.
 * @returns Formatted Date.
 */
export function formatDateDDMMYYYY(date: Date) {
	// We get a year.
	const yyyy = date.getFullYear()

	// We get a month.
	let mm: number | string = date.getMonth() + 1 // Months start at 0!

	// We get a day.
	let dd: number | string = date.getDate()

	// If the day is less than the tenth day, add a zero to the beginning of the line.
	if (dd < 10) dd = '0' + dd

	// If the month is less than the tenth day, add a zero to the beginning of the line.
	if (mm < 10) mm = '0' + mm

	// return the result
	return [dd, mm, yyyy]
}
