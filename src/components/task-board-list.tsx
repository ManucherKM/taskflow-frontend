import { ITask } from '@/storage/useTaskStore/types'
import type { FC } from 'react'
import { List } from './list'
import { TaskBoard } from './task-board'

export interface ITaskBoardList {
	tasks: ITask[]
	stageId: string
}

export const TaskBoardList: FC<ITaskBoardList> = ({ tasks, stageId }) => {
	return (
		<List
			arr={tasks}
			callback={task => (
				<TaskBoard key={task._id} task={task} stageId={stageId} />
			)}
		/>
	)
}
