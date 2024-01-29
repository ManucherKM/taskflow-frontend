// Types
import axios from '@/config/axios'
import { EBoardStoreApiRoutes, IBoard, type IBoardStore } from './types'

// Utils
import { create } from 'zustand'

// Default storage object.
const defaultStore = {
	isShow: false,
	boards: [] as IBoard[],
} as IBoardStore

/** With this hook you can access shared storage. */
export const useBoardStore = create<IBoardStore>((set, get) => ({
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
	setIsShow(target) {
		set({ isShow: target })
	},
	setBoards(target) {
		set({ boards: target })
	},
	addBoard(target) {
		set(prev => ({
			boards: [...prev.boards, target],
		}))
	},
	async create(target) {
		try {
			const { data } = await axios.post<IBoard>(
				EBoardStoreApiRoutes.create,
				target,
			)

			if (!data) {
				return false
			}

			get().addBoard(data)

			return true
		} catch (e) {
			console.error(e)
			return false
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
