/** Interface of data returned from the server during authorization using email. */
export interface ILoginWithEmailTarget {
	/** Email. */
	email: string

	/** Password. */
	password: string
}

/**
 * Interface of data returned from the server during authorization using
 * username.
 */
export interface ILoginWithUserNameTarget {
	/** User name. */
	userName: string

	/** Password. */
	password: string
}

/** Interface, the data returned by the server during authorization. */
export interface ILoginResponse {
	/** User access token. */
	accessToken: string
}

/** The interface of parameters that the `registration` function accepts. */
export interface IRegistrationTarget {
	/** Email. */
	email: string

	/** Password. */
	password: string

	/** User name. */
	userName: string

	/** First name. */
	firstName?: string

	/** Last name. */
	lastName?: string
}

/** Interface, the data returned by the server during registration. */
export interface IRegistrationResponse {
	/** The result of the request. */
	success: boolean
}

/** API response object interface when logging out. */
export interface ILogoutResponse {
	/** The result of the request. */
	success: boolean
}

/** API response object interface when receiving a new access token. */
export interface IGetNewAccessTokenResponse {
	/** User access token. */
	accessToken: string
}

/** Access token type. */
export type Token = string | null

/** Interface to the authorization store. */
export interface IAuthStore {
	/** A field for storing user information for multi-step authorization. */
	regInfo: Partial<IRegistrationTarget> | null

	/** User Access Token. */
	token: Token

	/**
	 * User registration function.
	 *
	 * @param registrationDto Parameters required for registration.
	 * @returns The importance of registration success.
	 */
	registration: (registrationDto: IRegistrationTarget) => Promise<boolean>

	/**
	 * Function for user authorization using email.
	 *
	 * @param loginDto Object with data required for authorization.
	 * @returns Access token or nothing.
	 */
	loginWithEmail: (
		loginDto: ILoginWithEmailTarget,
	) => Promise<string | undefined>

	/**
	 * Function for user authorization using user name.
	 *
	 * @param loginDto Object with data required for authorization.
	 * @returns Access token or nothing.
	 */
	loginWithUserName: (
		loginDto: ILoginWithUserNameTarget,
	) => Promise<string | undefined>

	/**
	 * Function to get a new access token.
	 *
	 * @returns Access token or nothing.
	 */
	getNewAccessToken: () => Promise<string | undefined>

	/**
	 * Function to check the username for existence.
	 *
	 * @param userName User name to be checked
	 * @returns The result of user verification.
	 */
	checkUserName: (userName: string) => Promise<boolean | undefined>

	/**
	 * Function to change the user's access token.
	 *
	 * @param token The value to which the access token will be changed.
	 */
	setToken: (token: Token) => void

	/**
	 * Function for changing the user registration data..
	 *
	 * @param regInfo The value to be added/replaced in the user's registration
	 *   information.
	 */
	setRegInfo: (regInfo: Partial<IRegistrationTarget> | null) => void

	/**
	 * Function for logging out of a user account.
	 *
	 * @returns Account logout success
	 */
	logout: () => Promise<boolean>

	/** Function to reset the storage to its initial state. */
	reset: () => void
}

/** Routes for api requests to the authorization store. */
export enum EAuthStoreApiRoutes {
	/** Route for authorization using email. */
	loginWithEmail = '/api/auth/login/email',

	/** Route for authorization using user name. */
	loginWithUserName = '/api/auth/login/username',

	/** Route for user registration. */
	registration = '/api/auth/registration',

	/** Route to obtain a new user access token. */
	getNewAccessToken = 'api/jwt/token',

	/** Route to check the username for existence. */
	checkUserName = 'api/auth/username',

	/** Route for logging out of the user account. */
	logout = 'api/auth/logout',
}
