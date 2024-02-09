/**
 * Function to get a random integer number.
 *
 * @param min Max number
 * @param max Min number
 * @returns Random number
 */
export function getRandomInt(min: number, max: number) {
	// We get min int number
	const localMin = Math.ceil(min)

	// We get max int number
	const localMax = Math.floor(max)

	// return random number
	return Math.floor(Math.random() * (localMax - localMin + 1)) + localMin
}
