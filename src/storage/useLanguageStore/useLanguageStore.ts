// Types
import { persist } from 'zustand/middleware'
import type { ILanguageStore } from './types'

// Utils
import { create } from 'zustand'

const defaultStore = {
	language: 'ru',
} as ILanguageStore

export const useLanguageStore = create(
	persist<ILanguageStore>(
		set => ({
			...defaultStore,
			setLanguage(language) {
				set({ language })
			},
		}),
		{ name: 'language-store' },
	),
)
