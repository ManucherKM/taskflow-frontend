// Types
import type { ILogoutStore } from './types'

// Utils
import { create } from 'zustand'

const defaultStore = {
	isShow: false,
} as ILogoutStore

export const useLogoutStore = create<ILogoutStore>(set => ({
	...defaultStore,
	setIsShow(target) {
		set({ isShow: target })
	},
	reset() {
		set(defaultStore)
	},
}))
