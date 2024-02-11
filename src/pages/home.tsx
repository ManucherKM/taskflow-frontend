// Types
import { IBoard } from '@/storage/useBoardStore/types'
import type { FC } from 'react'

// Components
import { BoardCardWrapper, BoardsNotFound, NavBar } from '@/components'

// Storage
import { useBoardStore, useMultipleBoardActionStore } from '@/storage'

// Utils
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Component with the user's homepage. */
export const Home: FC = () => {
	const { t } = useTranslation()

	// State for user-selected boards.
	const [selectedBoards, setSelectedBoards] = useState<IBoard[]>([])

	// Ref to the board container branch.
	const containerBoardsRef = useRef<HTMLDivElement | null>(null)

	// Func to modify user-selected boards in the storage for multiple actions.
	const multipleSetSelectedBoards = useMultipleBoardActionStore(
		store => store.setSelectedBoards,
	)

	// Func to change the display of a block with multiple actions.
	const setIsShowMultipleBoardAction = useMultipleBoardActionStore(
		store => store.setIsShow,
	)

	// Value for all boards that the user has.
	const boards = useBoardStore(store => store.boards)

	// The cached value of the user's favorite boards.
	const favoriteBoards = useMemo(
		() => boards.filter(board => board.isFavorite),
		[boards],
	)

	// The cached value of the user's non-favorite boards.
	const notFavoriteBoards = useMemo(
		() => boards.filter(board => !board.isFavorite),
		[boards],
	)

	// An effect that keeps track of the changes in the user-selected boards.
	useEffect(() => {
		// If the selected boards are less than two, complete the function.
		if (selectedBoards.length <= 1) return

		// Showing a block for multiple board actions.
		setIsShowMultipleBoardAction(true)

		// Transfer the selected boards to the store.
		multipleSetSelectedBoards(selectedBoards)
	}, [selectedBoards])

	return (
		<>
			<NavBar />
			{boards.length !== 0 && (
				<div ref={containerBoardsRef} className="container">
					<div className="mt-10 flex flex-col gap-10 select-none">
						{favoriteBoards.length !== 0 && (
							<BoardCardWrapper
								title={t('favorites')}
								container={containerBoardsRef.current}
								activeBoards={selectedBoards}
								boards={favoriteBoards}
								setActiveBoards={setSelectedBoards}
							/>
						)}

						{notFavoriteBoards.length !== 0 && (
							<BoardCardWrapper
								title={t('workspace')}
								container={containerBoardsRef.current}
								activeBoards={selectedBoards}
								boards={notFavoriteBoards}
								setActiveBoards={setSelectedBoards}
							/>
						)}
					</div>
				</div>
			)}

			{boards.length === 0 && (
				<div className="w-full h-[calc(100vh-73px)] flex flex-col justify-center items-center gap-2">
					<BoardsNotFound />
				</div>
			)}
		</>
	)
}
