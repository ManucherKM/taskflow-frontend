// Utils
import { from } from 'env-var'

/**
 * An object to receive environment variables.
 *
 * @example
 * 	const API_URL = env.get('API_URL').required().asString()
 */
export const env = from({
	/** URL required to interact with the API. */
	API_URL: import.meta.env.VITE_API_URL,

	/** The URL where the web application is hosted. */
	CLIENT_URL: import.meta.env.VITE_CLIENT_URL,
})
