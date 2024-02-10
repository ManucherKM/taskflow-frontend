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
import { IUser } from '../useUserStore/types'

// Default storage object.
const defaultStore = {
	boards: [] as IBoard[],
	activeBoard: null,
} as IBoardStore

/** With this hook, you can access the board's storage. */
export const useBoardStore = create<IBoardStore>((set, get) => ({
	...defaultStore,
	async getAllBoards() {
		try {
			// We get the boards.
			const { data, status } = await axios.get<IBoard[]>(
				EBoardStoreApiRoutes.all,
			)

			// If the server response status is above 400
			if (status >= 400) {
				// Complete the function.
				return
			}

			// We exchange the boards from the vault for the ones we received.
			set({ boards: data })

			// Return boards
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	async getDeepBoard(boardId) {
		try {
			// We get the board.
			const { data, status } = await axios.get<IDeepBoard>(
				EBoardStoreApiRoutes.deep + '/' + boardId,
			)

			// If the server response status is above 400
			if (status >= 400) {
				// Complete the function.
				return
			}

			// Return the board
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	async leave(boardId) {
		try {
			// We get the updated board.
			const { data } = await axios.post<IBoard | undefined>(
				EBoardStoreApiRoutes.leave,
				{
					boardId,
				},
			)

			// If the board is not found.
			if (!data) {
				// Complete the function.
				return
			}

			// Return the board
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	async create(createDto) {
		try {
			// We get the created board.
			const { data } = await axios.post<IBoard>(
				EBoardStoreApiRoutes.main,
				createDto,
			)

			// If the board is not found.
			if (!data) {
				// Complete the function.
				return
			}

			// Add a board to the user's list of boards
			set(prev => ({
				boards: [...prev.boards, data],
			}))

			// Return the board
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	async update(boardId, updateDto) {
		try {
			// We get the updated board.
			const { data } = await axios.patch<IBoard>(
				EBoardStoreApiRoutes.main + '/' + boardId,
				updateDto,
			)

			// If the board is not found.
			if (!data) {
				// Complete the function.
				return
			}

			// Return the board
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	async remove(boardId) {
		try {
			// We get the result of removing the board.
			const { data } = await axios.delete<{ success: boolean }>(
				EBoardStoreApiRoutes.main + '/' + boardId,
			)

			// If the result is not found or is not successful.
			if (!data?.success) {
				// Return false
				return false
			}

			// Remove the board from the user's board list.
			const boards = get().boards.filter(b => b._id !== boardId)

			// Replacing the boards with new ones in the vault.
			set({ boards })

			// Return true
			return true
		} catch (e) {
			// Show the error in the console.
			console.error(e)

			// Return false
			return false
		}
	},

	async getAllByName(name) {
		try {
			// We get the boards.
			const { data, status } = await axios.post<IBoard[]>(
				EBoardStoreApiRoutes.name,
				{ name },
			)

			// If the server response status is above 400
			if (status >= 400) {
				// Complete the function.
				return
			}

			// Return the boards
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	async inviteToDashboard(boardId) {
		try {
			// We get the updated board.
			const { data } = await axios.get<IBoard | undefined>(
				EBoardStoreApiRoutes.inviteToDashboard + '/' + boardId,
			)

			// If the board is not found.
			if (!data) {
				// Complete the function.
				return
			}

			// Return the board
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	async getBoardUsers(boardId) {
		try {
			// We get the user list
			const { data } = await axios.get<IUser[] | undefined>(
				EBoardStoreApiRoutes.members + '/' + boardId,
			)

			// If the user list is not found.
			if (typeof data === 'undefined') {
				// Complete the function.
				return
			}

			// Return the board
			return data
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	},

	setBoards(boards) {
		// Changing the boards in the store.
		set({ boards })
	},

	setActiveBoard(activeBoard) {
		// Changing the active board in the store.
		set({ activeBoard })
	},
}))
