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

			set({ boards: data })

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
				EBoardStoreApiRoutes.main,
				target,
			)

			if (!data) {
				return
			}

			get().addBoard(data)

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
