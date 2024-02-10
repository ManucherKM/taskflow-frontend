import type { IBoardMembersStore } from './types'

import { create } from 'zustand'

const defaultStore = {
	isShow: false,
	board: null,
} as IBoardMembersStore

export const useBoardMembersStore = create<IBoardMembersStore>(set => ({
	...defaultStore,
	setIsShow(target) {
		set({ isShow: target })
	},
	setBoard(board) {
		set({ board })
	},
}))
