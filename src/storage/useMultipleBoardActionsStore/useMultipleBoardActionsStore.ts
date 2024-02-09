// Types
import axios from '@/config/axios'
import { IBoard } from '../useBoardStore/types'
import {
	EMultipleBoardActionsStoreApiRoutes,
	type IMultipleBoardActionsStore,
} from './types'

// Utils
import { create } from 'zustand'

// Default storage object.
const defaultStore = {
	isShow: false,
	selectedBoards: [] as IBoard[],
} as IMultipleBoardActionsStore

/** With this hook you can access shared storage. */
export const useMultipleBoardActionStore = create<IMultipleBoardActionsStore>(
	set => ({
		...defaultStore,
		setSelectedBoards(target) {
			set({ selectedBoards: target })
		},
		setIsShow(isShow) {
			set({ isShow })
		},

		async remove(target) {
			try {
				const promises = []

				for (const board of target) {
					promises[promises.length] = axios.delete<{ success: boolean }>(
						EMultipleBoardActionsStoreApiRoutes.remove + '/' + board._id,
					)
				}

				const res = await Promise.all(promises)

				for (const board of res) {
					if (!board.data.success) {
						return false
					}
				}

				return true
			} catch (e) {
				console.log(e)

				return false
			}
		},
	}),
)
