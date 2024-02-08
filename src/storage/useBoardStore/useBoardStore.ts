// Types
import axios from '@/config/axios'
import {
	EBoardStoreApiRoutes,
	IBoard,
	IDeepBoard,
	type IBoardStore,
} from './types'

// Utils
import { create } from 'zustand'

// Default storage object.
const defaultStore = {
	boards: [] as IBoard[],
	activeBoard: null,
} as IBoardStore

/** With this hook you can access shared storage. */
export const useBoardStore = create<IBoardStore>((set, get) => ({
	...defaultStore,
	async getAllBoards() {
		try {
			const { data, status } = await axios.get<IBoard[]>(
				EBoardStoreApiRoutes.all,
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
	setActiveBoard(target) {
		set({ activeBoard: target })
	},

	async getDeepBoard(id) {
		try {
			const { data, status } = await axios.post<IDeepBoard>(
				EBoardStoreApiRoutes.deep,
				{
					id,
				},
			)

			if (status >= 400) {
				return
			}

			console.log()

			return data
		} catch (e) {
			console.error(e)
		}
	},

	async leave(boardId) {
		try {
			const { data } = await axios.post<IBoard | undefined>(
				EBoardStoreApiRoutes.leave,
				{
					boardId,
				},
			)

			if (!data) {
				return
			}

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
			const { data } = await axios.patch<IBoard>(
				EBoardStoreApiRoutes.main + '/' + id,
				target,
			)

			if (!data) {
				return
			}

			return data
		} catch (e) {
			console.error(e)
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

	async inviteToDashboard(boardId) {
		try {
			const { data } = await axios.get<IBoard | undefined>(
				EBoardStoreApiRoutes.inviteToDashboard + '/' + boardId,
			)

			if (!data) {
				return
			}

			return data
		} catch (e) {
			console.error(e)
		}
	},
}))
