// Types
import axios from '@/config/axios'
import { EUserStoreApiRoutes, IUser, type IUserStore } from './types'

// Utils
import { create } from 'zustand'

// Default storage object.
const defaultStore = {} as IUserStore

/** With this hook you can access shared storage. */
export const useUserStore = create<IUserStore>(set => ({
	...defaultStore,
	async getUser() {
		try {
			const { data } = await axios.get<IUser>(EUserStoreApiRoutes.getUser)

			if (!data) {
				return false
			}

			set({ user: data })

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	},

	async update(target) {
		try {
			const { data } = await axios.patch<IUser>(
				EUserStoreApiRoutes.getUser,
				target,
			)

			if (!data) {
				return
			}

			return data
		} catch (e) {
			console.error(e)
		}
	},

	setUser(user: IUser) {
		set({ user })
	},
}))
