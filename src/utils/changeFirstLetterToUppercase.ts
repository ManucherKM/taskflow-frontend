export function changeFirstLetterToUppercase(str: string) {
	let right = str.slice(1, str.length)

	return str[0].toUpperCase() + right
}
