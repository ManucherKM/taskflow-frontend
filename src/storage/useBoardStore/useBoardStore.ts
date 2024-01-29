// Types
import axios from '@/config/axios'
import { EBoardStoreApiRoutes, IBoard, type IBoardStore } from './types'

// Utils
import { create } from 'zustand'

// Default storage object.
const defaultStore = {} as IBoardStore

/** With this hook you can access shared storage. */
export const useBoardStore = create<IBoardStore>(set => ({
	...defaultStore,
	async getAllBoards(target) {
		try {
			const { data, status } = await axios.post<IBoard[]>(
				EBoardStoreApiRoutes.all,
				target,
			)

			if (status >= 400) {
				return
			}

			return data
		} catch (e) {
			console.error(e)
		}
	},

	async getAllByName(target) {
		try {
			const { data, status } = await axios.post<IBoard[]>(
				EBoardStoreApiRoutes.name,
				target,
			)

			if (status >= 400) {
				return
			}

			return data
		} catch (e) {
			console.error(e)
		}
	},
	reset() {
		// Reset the storage to its original state.
		set(defaultStore)
	},
}))
