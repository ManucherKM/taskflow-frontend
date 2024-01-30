import type { ICreateBoardStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShow: false,
} as ICreateBoardStore

export const useCraeteBoardStore = create<ICreateBoardStore>(set => ({
	...defaultStore,
	setIsShow(target) {
		set({ isShow: target })
	},
}))
