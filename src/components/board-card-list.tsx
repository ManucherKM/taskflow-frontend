import { IBoard } from '@/storage/useBoardStore/types'
import { FC } from 'react'
import { BoardCard } from './board-card'
import { List } from './list'

export interface IBoardCardList {
	activeBoards: string[]
	boards: IBoard[]
	onActiveBoardChange: (board: IBoard) => void
}

export const BoardCardList: FC<IBoardCardList> = ({
	boards,
	activeBoards,
	onActiveBoardChange,
}) => {
	function activeBoardChangeHanler(board: IBoard) {
		onActiveBoardChange(board)
	}

	return (
		<List
			arr={boards}
			callback={board => (
				<BoardCard
					key={board._id}
					isActive={activeBoards.includes(board._id)}
					board={board}
					onClick={() => activeBoardChangeHanler(board)}
				/>
			)}
		/>
	)
}
