import type { IUpdateBoardStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShow: false,
	board: null,
} as IUpdateBoardStore

export const useUpdateBoardStore = create<IUpdateBoardStore>(set => ({
	...defaultStore,
	setIsShow(target) {
		set({ isShow: target })
	},
	setBoard(board) {
		set({ board })
	},
}))
