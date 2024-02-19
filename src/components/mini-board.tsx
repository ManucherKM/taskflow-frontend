import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'

export interface IMiniBoard extends HTMLAttributes<HTMLDivElement> {
	bg: string
	modal: string
	skeleton: string
	modalBorder?: string
}

export const MiniBoard: FC<IMiniBoard> = ({
	bg,
	modal,
	skeleton,
	className,
	modalBorder,
	...props
}) => {
	return (
		<div
			className={cn([
				'items-center rounded-md border-2 border-muted p-1 hover:border-accent',
				className,
			])}
			{...props}
		>
			<div className={cn(['space-y-2 rounded-sm p-2', bg])}>
				<div
					className={cn([
						'space-y-2 rounded-md p-2 shadow-sm',
						modal,
						modalBorder,
					])}
				>
					<div className={cn(['h-2 w-3/5 rounded-lg', skeleton])} />
					<div className={cn(['h-2 w-4/5 rounded-lg'], skeleton)} />
				</div>
				<div
					className={cn([
						'flex items-center space-x-2 rounded-md p-2 shadow-sm',
						modal,
						modalBorder,
					])}
				>
					<div className={cn(['h-4 w-4 rounded-full', skeleton])} />
					<div className={cn(['h-2 w-4/5 rounded-lg', skeleton])} />
				</div>
				<div
					className={cn([
						'flex items-center space-x-2 rounded-md p-2 shadow-sm',
						modal,
						modalBorder,
					])}
				>
					<div className={cn(['h-4 w-4 rounded-full', skeleton])} />
					<div className={cn(['h-2 w-4/5 rounded-lg', skeleton])} />
				</div>
			</div>
		</div>
	)
}
