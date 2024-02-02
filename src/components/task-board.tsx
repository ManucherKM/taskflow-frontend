import { ITask } from '@/storage/useBoardStore/types'
import type { FC } from 'react'
import { Icons } from './icons'
import { Button } from './ui/button'

export interface ITaskBoard {
	task: ITask
}

export const TaskBoard: FC<ITaskBoard> = ({ task }) => {
	return (
		<Button className="justify-start group">
			{task.title}

			<Button
				variant={'ghost'}
				size={'icon'}
				className="p-[3px] w-fit h-fit ml-auto hidden group-hover:block"
			>
				<Icons.pencil />
			</Button>
		</Button>
	)
}
