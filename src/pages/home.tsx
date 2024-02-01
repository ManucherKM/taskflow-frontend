import { BoardCardWrapper, BoardsNotFound, NavBar } from '@/components'
import { useBoardStore, useMultipleBoardActionStore } from '@/storage'
import { useEffect, useMemo, useRef, useState, type FC } from 'react'

export const Home: FC = () => {
	const [selectedBoards, setSelectedBoards] = useState<string[]>([])

	const containerBoardsRef = useRef<HTMLDivElement | null>(null)

	const multipleSetSelectedBoards = useMultipleBoardActionStore(
		store => store.setSelectedBoards,
	)

	const boards = useBoardStore(store => store.boards)

	const favoriteBoards = useMemo(
		() => boards.filter(board => board.isFavorite),
		[boards],
	)

	const notFavoriteBoards = useMemo(
		() => boards.filter(board => !board.isFavorite),
		[boards],
	)

	useEffect(() => {
		multipleSetSelectedBoards(
			boards.filter(b => selectedBoards.includes(b._id)),
		)
	}, [selectedBoards])

	return (
		<>
			<NavBar />

			{boards.length !== 0 ? (
				<div ref={containerBoardsRef} className="container">
					<div className="mt-10 flex flex-col gap-10 select-none">
						{favoriteBoards.length !== 0 && (
							<BoardCardWrapper
								title="Избранное"
								container={containerBoardsRef.current}
								activeBoards={selectedBoards}
								boards={favoriteBoards}
								setActiveBoards={setSelectedBoards}
							/>
						)}

						{notFavoriteBoards.length !== 0 && (
							<BoardCardWrapper
								title="Рабочее пространство"
								container={containerBoardsRef.current}
								activeBoards={selectedBoards}
								boards={notFavoriteBoards}
								setActiveBoards={setSelectedBoards}
							/>
						)}
					</div>
				</div>
			) : (
				<div className="w-full h-[calc(100vh-72px)] flex flex-col justify-center items-center gap-2">
					<BoardsNotFound />
				</div>
			)}
		</>
	)
}
