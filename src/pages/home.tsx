import { BoardCardList, NavBar, TypographyH3, toast } from '@/components'
import { useLoader } from '@/hooks'
import { useBoardStore } from '@/storage'
import { useEffect, useMemo, useState, type FC } from 'react'

export const Home: FC = () => {
	const [selectedBoards, setSelectedBoards] = useState<string[]>([])
	const loader = useLoader()
	const boards = useBoardStore(store => store.boards)
	const favoriteBoards = useMemo(
		() => boards.filter(board => board.isFavorite),
		[boards],
	)
	const notFavoriteBoards = useMemo(
		() => boards.filter(board => !board.isFavorite),
		[boards],
	)
	const getAllBoards = useBoardStore(store => store.getAllBoards)

	useEffect(() => {
		const fetch = async () => {
			try {
				const fetchedBoards = await loader(getAllBoards)

				if (!fetchedBoards) {
					toast({
						title: 'Не удалось получить список досок',
					})
					return
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetch()
	}, [])

	return (
		<>
			<NavBar />

			{boards.length !== 0 ? (
				<div className="container">
					<div className="mt-10 flex flex-col gap-10">
						{favoriteBoards.length !== 0 && (
							<>
								<TypographyH3>Избранное</TypographyH3>
								<div className="grid gap-3 grid-cols-5">
									<BoardCardList
										activeBoards={selectedBoards}
										boards={favoriteBoards}
										onActiveBoardChange={board =>
											setSelectedBoards(prev => {
												if (prev.includes(board._id)) {
													return prev.filter(curr => curr !== board._id)
												} else {
													return [...prev, board._id]
												}
											})
										}
									/>
								</div>
							</>
						)}

						{notFavoriteBoards.length !== 0 && (
							<>
								<TypographyH3>Рабочее пространство</TypographyH3>
								<div className="grid gap-3 grid-cols-5">
									<BoardCardList
										activeBoards={selectedBoards}
										boards={notFavoriteBoards}
										onActiveBoardChange={board =>
											setSelectedBoards(prev => {
												if (prev.includes(board._id)) {
													return prev.filter(curr => curr !== board._id)
												} else {
													return [...prev, board._id]
												}
											})
										}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				<>
					<h1>Похоже что у вас нет активных досок</h1>
				</>
			)}
		</>
	)
}
