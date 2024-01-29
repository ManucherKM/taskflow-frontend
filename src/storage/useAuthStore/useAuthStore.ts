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
import { useStore } from '..'
import { EAuthStoreApiRoutes } from './types'

// The URL where the web application is hosted.
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

// Default storage object.
const defaultAuthStore = {
	token: null,
	regInfo: null,
}

/** With this hook you can access the authorization storage. */
export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...defaultAuthStore,
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
						return false
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
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
						return false
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// Return false.
					return false
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
					// send a request to log out of your account to the API.
					const { data } = await axios.get<ILogoutResponse>(
						EAuthStoreApiRoutes.logout,
					)

					// If the request is unsuccessful.
					if (!data?.success) {
						// Return false.
						return false
					}

					// Reset the shared storage.
					useStore.getState().reset()

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
					// send a request to receive an access token.
					const { data } = await axios.post<IGetNewAccessTokenResponse>(
						EAuthStoreApiRoutes.getNewAccessToken,
					)

					// Check whether the access token was received from the API.
					if (!data.accessToken) {
						// If not, return false.
						return false
					}

					// We change the state of the token in the storage.
					set({ token: data.accessToken })

					// Return true.
					return true
				} catch (e) {
					// We show the error in the console.
					console.error(e)

					// If we were unable to obtain an access token, log out of the user account.
					get().logout()

					// Redirecting the user to the login page.
					history.push(CLIENT_URL + ERoutes.login)

					// Return false.
					return false
				}
			},

			async checkUserName(target) {
				try {
					const { data } = await axios.post<{ exist: boolean }>(
						EAuthStoreApiRoutes.checkUserName,
						{ userName: target },
					)

					return data?.exist
				} catch (e) {
					console.error(e)

					return false
				}
			},
			setToken(token) {
				// We change the token.
				set({ token })
			},
			setRegInfo(target) {
				set(prev => ({ regInfo: { ...(prev.regInfo || {}), ...target } }))
			},
			reset() {
				// We reset the storage to its original state.
				set(defaultAuthStore)
			},
		}),
		{ name: 'auth-store' },
	),
)
