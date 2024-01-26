export function getRandomInt(min: number, max: number) {
	const localMin = Math.ceil(min)
	const localMax = Math.floor(max)
	return Math.floor(Math.random() * (localMax - localMin + 1)) + localMin
}
