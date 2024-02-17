import { ERoutes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { IBoard } from '@/storage/useBoardStore/types'
import { FC, HTMLAttributes } from 'react'
import { useNavigate } from 'react-router'
import { BoardActionContextMenu, SlideLeft } from '.'
import { AspectRatio } from './ui/aspect-ratio'

export interface IBoardCard extends HTMLAttributes<HTMLDivElement> {
	isActive?: boolean
	board: IBoard
}

export const BoardCard: FC<IBoardCard> = ({
	board,
	isActive = false,
	className,
	...props
}) => {
	const navigate = useNavigate()

	return (
		<SlideLeft>
			<BoardActionContextMenu board={board}>
				<div
					className="cursor-pointer transition-all"
					onClick={() => navigate(ERoutes.dashboard + '/' + board._id)}
				>
					<AspectRatio
						ratio={16 / 9}
						className={cn([
							'bg-background rounded-sm border border-input flex justify-center items-center relative hover:bg-input',
							isActive && 'bg-input',
							className,
						])}
						tabIndex={0}
						{...props}
					>
						<div className="w-3/4 overflow-hidden text-ellipsis text-center">
							<span className="text-foreground font-medium">{board.name}</span>
						</div>
					</AspectRatio>
				</div>
			</BoardActionContextMenu>
		</SlideLeft>
	)
}
