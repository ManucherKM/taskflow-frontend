import { IBoard, IUpdateBoard } from '@/storage/useBoardStore/types'

export function changeBoardByTarget(
	boards: IBoard[],
	id: string,
	target: IUpdateBoard,
) {
	return boards.map(prevBoard => {
		if (prevBoard._id === id) {
			const board = { ...prevBoard }

			if (target.name !== undefined) {
				board.name = target.name
			}

			if (target.isFavorite !== undefined) {
				board.isFavorite = target.isFavorite
			}

			if (target.stages !== undefined) {
				board.stages = target.stages
			}

			if (target.admins !== undefined) {
				board.admins = target.admins
			}

			if (target.users !== undefined) {
				board.users = target.users
			}

			return board
		}

		return prevBoard
	})
}
