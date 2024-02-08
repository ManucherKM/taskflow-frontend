// Types
import { IInviteUserToBoardStore } from './types'

// Utils
import { create } from 'zustand'

const defaultStore = {
	isShow: false,
	board: null,
} as IInviteUserToBoardStore

export const useInviteUserToBoardStore = create<IInviteUserToBoardStore>(
	(set, get) => ({
		...defaultStore,
		setIsShow(isShow) {
			set({ isShow })
		},
		setBoard(board) {
			set({ board })
		},
	}),
)
