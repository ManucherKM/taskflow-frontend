/**
 * Function to change the first letter of a string to an uppercase letter.
 *
 * @param str The string that needs to be changed.
 * @returns A copy of the modified line.
 */
export function changeFirstLetterToUpperCase(str: string) {
	// We get all the letters except the first one.
	let right = str.slice(1)

	// Return the modified string.
	return str[0].toUpperCase() + right
}
