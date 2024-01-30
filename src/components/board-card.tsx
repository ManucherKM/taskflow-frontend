import { cn } from '@/lib/utils'
import { IBoard } from '@/storage/useBoardStore/types'
import { Slot } from '@radix-ui/react-slot'
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
	...props
}) => {
	const Wrapper = isActive ? BoardActionContextMenu : Slot
	return (
		<Wrapper board={board}>
			<div className="max-w-52 cursor-pointer transition-all">
				<AspectRatio
					ratio={16 / 9}
					className={cn([
						'bg-background rounded-sm border border-input flex justify-center items-center relative',
						isActive && 'bg-input',
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
		</Wrapper>
	)
}
