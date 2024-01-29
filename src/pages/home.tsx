import { NavBar, TypographyH3 } from '@/components'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ERoutes } from '@/config/routes'
import { useBoardStore } from '@/storage'
import { IBoard } from '@/storage/useBoardStore/types'
import { useEffect, useMemo, type FC } from 'react'
import { Link } from 'react-router-dom'

interface ICard {
	board: IBoard
}

const Card: FC<ICard> = ({ board }) => {
	return (
		<Link
			to={ERoutes.board + '/' + board._id}
			key={board._id}
			className="max-w-52 cursor-pointer hover:opacity-50 transition-all"
		>
			<AspectRatio
				ratio={16 / 9}
				className="bg-background rounded-sm border border-input flex justify-center items-center hover"
			>
				<div>
					<span className="max-w-40 w-fit overflow-hidden text-ellipsis text-foreground font-medium">
						Инфоцентр
					</span>
				</div>
			</AspectRatio>
		</Link>
	)
}

export const Home: FC = () => {
	const boards = useBoardStore(store => store.boards)

	const favoriteBoards = useMemo(
		() => boards.filter(board => board.isFavorite),
		[boards],
	)

	const getAllBoards = useBoardStore(store => store.getAllBoards)

	useEffect(() => {
		getAllBoards()
	}, [])

	return (
		<>
			<NavBar />

			<div className="container">
				<div className="mt-10 flex flex-col gap-10">
					<TypographyH3>Избранное</TypographyH3>
					<div className="grid gap-3 grid-cols-5">
						{favoriteBoards.map(board => (
							<Card board={board} />
						))}
					</div>
					<TypographyH3>Рабочее пространство</TypographyH3>
					<div className="grid gap-3 grid-cols-5">
						{boards.map(board => (
							<Card board={board} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}
