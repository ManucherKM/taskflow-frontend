import { IBoard, IUpdateBoard } from '@/storage/useBoardStore/types'

export function changeBoardByTarget(
	boards: IBoard[],
	id: string,
	target: IUpdateBoard,
) {
	return boards.map(prevBoard => {
		if (prevBoard._id === id) {
			if (target.name) {
				prevBoard.name = target.name
			}

			if (target.isFavorite) {
				prevBoard.isFavorite = target.isFavorite
			}

			if (target.stages) {
				prevBoard.stages = target.stages
			}

			if (target.admins) {
				prevBoard.admins = target.admins
			}

			if (target.users) {
				prevBoard.users = target.users
			}
		}

		return prevBoard
	})
}
