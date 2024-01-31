// Types
import axios from '@/config/axios'
import { EBoardStoreApiRoutes, IBoard, type IBoardStore } from './types'

// Utils
import { changeBoardByTarget } from '@/utils'
import { create } from 'zustand'

// Default storage object.
const defaultStore = {
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

			set({ boards: data })

			return data
		} catch (e) {
			console.error(e)
		}
	},

	setBoards(target) {
		set({ boards: target })
	},

	async create(target) {
		try {
			const { data } = await axios.post<IBoard>(
				EBoardStoreApiRoutes.main,
				target,
			)

			if (!data) {
				return
			}

			set(prev => ({
				boards: [...prev.boards, data],
			}))

			return data
		} catch (e) {
			console.error(e)
		}
	},

	async update(id, target) {
		try {
			const { data } = await axios.patch<{ success: boolean }>(
				EBoardStoreApiRoutes.main + '/' + id,
				target,
			)

			if (!data?.success) {
				return false
			}

			const boards = changeBoardByTarget(get().boards, id, target)

			set({ boards })

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	},

	async remove(id) {
		try {
			const { data } = await axios.delete<{ success: boolean }>(
				EBoardStoreApiRoutes.main + '/' + id,
			)

			if (!data?.success) {
				return false
			}

			const boards = get().boards.filter(b => b._id !== id)

			set({ boards })

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
}))
