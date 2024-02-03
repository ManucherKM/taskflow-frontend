import { ITask } from '@/storage/useBoardStore/types'
import type { FC } from 'react'
import { TaskContextMenu } from './task-context-menu'
import { Button } from './ui/button'

export interface ITaskBoard {
	task: ITask
}

export const TaskBoard: FC<ITaskBoard> = ({ task }) => {
	return (
		<TaskContextMenu>
			<Button className="justify-start group w-full cursor-grab">
				{task.title}
			</Button>
		</TaskContextMenu>
	)
}
