import { IBoard } from '@/storage/useBoardStore/types'
import { Dispatch, FC, SetStateAction } from 'react'
import Selecto, { OnSelect } from 'react-selecto'
import { BoardCard } from './board-card'
import { List } from './list'

export interface IBoardCardList {
	activeBoards: string[]
	boards: IBoard[]
	setActiveBoards: Dispatch<SetStateAction<string[]>>
	container: HTMLElement | null
}

export const BoardCardList: FC<IBoardCardList> = ({
	boards,
	activeBoards,
	setActiveBoards,
	container,
}) => {
	// Function that will be executed when an element of the file is selected.
	function selectHandler(e: OnSelect) {
		e.added.forEach(el => {
			const boardId = el.dataset.id

			if (!boardId) return

			setActiveBoards(prev => [...prev, boardId])
		})

		// Iterate through the files that were deleted.
		e.removed.forEach(el => {
			const boardId = el.dataset.id

			if (!boardId) return

			setActiveBoards(prev => prev.filter(id => id !== boardId))
		})
	}

	return (
		<>
			<List
				arr={boards}
				callback={board => (
					<BoardCard
						key={board._id}
						data-id={board._id}
						isActive={activeBoards.includes(board._id)}
						board={board}
						className="board"
					/>
				)}
			/>

			<Selecto
				container={container}
				dragContainer={document.body}
				selectableTargets={['.board']}
				selectByClick
				selectFromInside
				continueSelect={false}
				toggleContinueSelect={'shift'}
				hitRate={100}
				onSelect={selectHandler}
			/>
		</>
	)
}
