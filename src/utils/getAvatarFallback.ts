/**
 * Function to get a string for the user's temporary avatar.
 *
 * @param name Username which can be any string.
 * @returns Avatar fallback
 */
export function getAvatarFallback(name: string) {
	// Return the first two letters by capitalizing them.
	return (name[0] + name[1]).toUpperCase()
}
