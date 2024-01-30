import type { IUpdateBoardStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShow: false,
	id: '',
} as IUpdateBoardStore

export const useUpdateBoardStore = create<IUpdateBoardStore>(set => ({
	...defaultStore,
	setIsShow(target) {
		set({ isShow: target })
	},
	setId(id) {
		set({ id })
	},
}))
