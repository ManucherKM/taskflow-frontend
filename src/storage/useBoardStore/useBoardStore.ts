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
	setActiveBoard(activeBoard) {
		set({ activeBoard })
	},

	async getDeepBoard(boardId) {
		try {
			const { data, status } = await axios.post<IDeepBoard>(
				EBoardStoreApiRoutes.deep,
				{
					boardId,
				},
			)

			if (status >= 400) {
				return
			}

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

	setBoards(boards) {
		set({ boards })
	},

	async create(createDto) {
		try {
			const { data } = await axios.post<IBoard>(
				EBoardStoreApiRoutes.main,
				createDto,
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

	async update(boardId, updateDto) {
		try {
			const { data } = await axios.patch<IBoard>(
				EBoardStoreApiRoutes.main + '/' + boardId,
				updateDto,
			)

			if (!data) {
				return
			}

			return data
		} catch (e) {
			console.error(e)
		}
	},

	async remove(boardId) {
		try {
			const { data } = await axios.delete<{ success: boolean }>(
				EBoardStoreApiRoutes.main + '/' + boardId,
			)

			if (!data?.success) {
				return false
			}

			const boards = get().boards.filter(b => b._id !== boardId)

			set({ boards })

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	},

	async getAllByName(name) {
		try {
			const { data, status } = await axios.post<IBoard[]>(
				EBoardStoreApiRoutes.name,
				{ name },
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
