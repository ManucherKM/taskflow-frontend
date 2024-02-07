import { ITask } from '@/storage/useTaskStore/types'
import { type FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'
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
			callback={(task, idx) => (
				<Draggable key={task._id} draggableId={task._id} index={idx}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							key={task._id}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<TaskBoard key={task._id} task={task} stageId={stageId} />
						</div>
					)}
				</Draggable>
			)}
		/>
	)
}
