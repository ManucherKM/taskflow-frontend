// Types
import type {
	IAuthStore,
	IGetNewAccessTokenResponse,
	ILoginResponse,
	ILogoutResponse,
	IRegistrationResponse,
} from './types'

// Utils
import axios from '@/config/axios'
import { env } from '@/config/env'
import { history } from '@/config/history'
import { ERoutes } from '@/config/routes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EAuthStoreApiRoutes } from './types'

// The URL where the web application is hosted.
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

// Default storage object.
const defaultStore = {
	token: null,
	regInfo: null,
}

/** With this hook you can access the authorization storage. */
export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...defaultStore,
			setToken(token) {
				// We change the token.
				set({ token })
			},
			setRegInfo(target) {
				// Add non-existent fields and replace existing ones from the passed data.
				set({ regInfo: target })
			},
			async loginWithEmail(loginDto) {
				try {
					// We send a request for user authorization to the API.
					const { data } = await axios.post<ILoginResponse>(
						EAuthStoreApiRoutes.loginWithEmail,
						loginDto,
					)

					// Check if the access token has arrived.
					if (!data?.accessToken) {
						// If there is no token, return false.
						return
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return the access token.
					return data.accessToken
				} catch (e) {
					// We show the error in the console.
					console.error(e)
				}
			},
			async loginWithUserName(loginDto) {
				try {
					// We send a request for user authorization to the API.
					const { data } = await axios.post<ILoginResponse>(
						EAuthStoreApiRoutes.loginWithUserName,
						loginDto,
					)

					// Check if the access token has arrived.
					if (!data?.accessToken) {
						// If there is no token, return false.
						return
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return data.accessToken
				} catch (e) {
					// We show the error in the console.
					console.error(e)
				}
			},
			async registration(registrationDto) {
				try {
					// We send a request for user registration to the API.
					const { data } = await axios.post<IRegistrationResponse>(
						EAuthStoreApiRoutes.registration,
						registrationDto,
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
				}
			},
			async logout() {
				try {
					// Send a request to log out of your account to the API.
					const { data } = await axios.get<ILogoutResponse>(
						EAuthStoreApiRoutes.logout,
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// We reset the auth-store storage.
					get().reset()

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)
					// Return false.
					return false
				}
			},
			async getNewAccessToken() {
				try {
					// Send a request to receive an access token.
					const { data } = await axios.post<IGetNewAccessTokenResponse>(
						EAuthStoreApiRoutes.getNewAccessToken,
					)

					// Check whether the access token was received from the API.
					if (!data.accessToken) {
						// If not, return false.
						return
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return access token.
					return data.accessToken
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// If we were unable to obtain an access token, log out of the user account.
					get().logout()

					// Redirecting the user to the login page.
					history.push(CLIENT_URL + ERoutes.login)
				}
			},
			async checkUserName(target) {
				try {
					// Send a request to verify the user name.
					const { data } = await axios.post<{ exist: boolean }>(
						EAuthStoreApiRoutes.checkUserName,
						{ userName: target },
					)

					// Return the result
					return data?.exist
				} catch (e) {
					// We show the error in the console.
					console.error(e)
				}
			},
			reset() {
				// We reset the storage to its original state.
				set(defaultStore)
			},
		}),
		{ name: 'auth-store' },
	),
)
