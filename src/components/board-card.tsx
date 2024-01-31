import { cn } from '@/lib/utils'
import { IBoard } from '@/storage/useBoardStore/types'
import { FC, HTMLAttributes } from 'react'
import { BoardActionContextMenu } from '.'
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
	return (
		<BoardActionContextMenu board={board}>
			<div className="max-w-52 cursor-pointer transition-all">
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
					<div>
						<span className="max-w-40 w-fit overflow-hidden text-ellipsis text-foreground font-medium">
							{board.name}
						</span>
					</div>
				</AspectRatio>
			</div>
		</BoardActionContextMenu>
	)
}
