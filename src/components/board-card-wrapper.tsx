import type { FC } from 'react'
import { TypographyH3 } from '.'
import { BoardCardList, IBoardCardList } from './board-card-list'

export interface IBoardCardWrapper extends IBoardCardList {
	title: string
}

export const BoardCardWrapper: FC<IBoardCardWrapper> = ({
	title,
	activeBoards,
	boards,
	container,
	setActiveBoards,
}) => {
	return (
		<>
			<TypographyH3>{title}</TypographyH3>
			<div className="grid gap-3 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
				<BoardCardList
					container={container}
					activeBoards={activeBoards}
					boards={boards}
					setActiveBoards={setActiveBoards}
				/>
			</div>
		</>
	)
}
