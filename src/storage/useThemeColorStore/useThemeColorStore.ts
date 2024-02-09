// Types
import { persist } from 'zustand/middleware'
import { IThemeColorStoreStore } from './types'

// Utils
import { create } from 'zustand'

export const useThemeColorStore = create(
	persist<IThemeColorStoreStore>(
		set => ({
			theme: 'zinc',
			setTheme(theme) {
				set({ theme })
			},
		}),
		{ name: 'theme-color-store' },
	),
)
