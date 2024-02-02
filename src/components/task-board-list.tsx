import { ITask } from '@/storage/useBoardStore/types'
import type { FC } from 'react'
import { List } from './list'
import { TaskBoard } from './task-board'

export interface ITaskBoardTist {
	tasks: ITask[]
}

export const TaskBoardTist: FC<ITaskBoardTist> = ({ tasks }) => {
	return (
		<List
			arr={tasks}
			callback={task => <TaskBoard key={task._id} task={task} />}
		/>
	)
}
