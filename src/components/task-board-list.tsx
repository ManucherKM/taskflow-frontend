import { ITask } from '@/storage/useBoardStore/types'
import type { FC } from 'react'
import { List } from './list'
import { TaskBoard } from './task-board'

export interface ITaskBoardList {
	tasks: ITask[]
}

export const TaskBoardList: FC<ITaskBoardList> = ({ tasks }) => {
	return (
		<List
			arr={tasks}
			callback={task => <TaskBoard key={task._id} task={task} />}
		/>
	)
}
