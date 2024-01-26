/** The interface of parameters that the `login` function accepts. */
export interface ILoginWithEmailTarget {
	/** Email. */
	email: string

	/** Password. */
	password: string
}

export interface ILoginWithUserNameTarget {
	/** User name. */
	userName: string

	/** Password. */
	password: string
}

/**
 * The interface of parameters returned by the server when using the `login`
 * function.
 */
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

	/** Avatar */
	avatar?: string
}

/**
 * The interface of parameters returned by the server when using the
 * `registration` function.
 */
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
	regInfo: null | Partial<IRegistrationTarget>

	token: null | string

	loginWithEmail: (loginDto: ILoginWithEmailTarget) => Promise<boolean>

	loginWithUserName: (loginDto: ILoginWithUserNameTarget) => Promise<boolean>

	/**
	 * User registration function.
	 *
	 * @param registrationDto Parameters required to send a request to the API.
	 */
	registration: (registrationDto: IRegistrationTarget) => Promise<boolean>

	/** Function to get a new access token. */
	getNewAccessToken: () => Promise<boolean>

	checkUserName: (target: string) => Promise<boolean>

	/**
	 * Function to change the user's access token.
	 *
	 * @param token The value to which the access token will be changed.
	 */
	setToken: (token: Token) => void

	setRegInfo: (target: Partial<IRegistrationTarget>) => void

	/** Function for logging out of a user account. */
	logout: () => Promise<boolean>

	/** Function to reset the storage to its initial state. */
	reset: () => void
}

/** Routes for api requests to the authorization store. */
export enum EAuthStoreApiRoutes {
	loginWithEmail = '/api/auth/login/email',

	loginWithUserName = '/api/auth/login/username',

	/** Route for user registration. */
	registration = '/api/auth/registration',

	/** Route to obtain a new user access token. */
	getNewAccessToken = 'api/jwt/token',

	checkUserName = 'api/auth/username',

	/** Route for logging out of the user account. */
	logout = 'api/auth/logout',
}
