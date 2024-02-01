// Types
import type { IDisplayStore } from './types'

// Utils
import { create } from 'zustand'

// Default storage object.
const defaultStore = {
	font: 'sans',
	laguage: 'ru',
	theme: 'dark',
} as IDisplayStore

/** With this hook you can access shared storage. */
export const useDisplayStore = create<IDisplayStore>(set => ({
	...defaultStore,
	setTheme(target) {
		set({ theme: target })
	},
	setFont(target) {
		set({ font: target })
	},
	setLanguage(target) {
		set({ laguage: target })
	},
}))
