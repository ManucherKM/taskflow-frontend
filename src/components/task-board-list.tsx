import { IStage } from '@/storage/useStageStore/types'
import { ITask } from '@/storage/useTaskStore/types'
import { DragEvent, useState, type FC } from 'react'
import { List } from './list'
import { TaskBoard } from './task-board'

export interface ITaskBoardList {
	tasks: ITask[]
	stages: IStage[]
	onChangeStages: (stages: IStage[]) => void
	stage: IStage
}

export const TaskBoardList: FC<ITaskBoardList> = ({
	tasks,
	stage,
	stages,
	onChangeStages,
}) => {
	const [startTask, setStartTask] = useState<ITask | null>(null)
	const [startStage, setStartStage] = useState<IStage | null>(null)

	function dragStartHandler(
		e: DragEvent<HTMLButtonElement>,
		task: ITask,
		dropStage: IStage,
	) {
		e.stopPropagation()

		setStartTask(task)
		setStartStage(dropStage)
	}

	function dragEndHandler(e: DragEvent<HTMLButtonElement>) {
		setStartTask(null)
	}

	function dragOverHandler(e: DragEvent<HTMLButtonElement>) {
		e.preventDefault()

		if ((e.target as HTMLButtonElement).dataset.id) {
			;(e.target as HTMLButtonElement).style.opacity = '0.5'
		}
	}

	function dragLeaveHandler(e: DragEvent<HTMLButtonElement>) {
		;(e.target as HTMLButtonElement).style.removeProperty('opacity')
	}

	function dropHandler(
		e: DragEvent<HTMLButtonElement>,
		task: ITask,
		dropStage: IStage,
	) {
		e.preventDefault()
		;(e.target as HTMLButtonElement).style.removeProperty('opacity')

		if (!startTask || !startStage) {
			return
		}

		const currentIndex = startStage.tasks.indexOf(startTask)

		startStage.tasks.splice(currentIndex, 1)

		const dropIndx = dropStage.tasks.indexOf(task)

		console.log(dropStage.tasks)

		dropStage.tasks.splice(dropIndx + 1, 0, startTask)
		console.log(dropStage.tasks)

		const changedStages = stages.map(curr => {
			if (curr._id === dropStage._id) {
				return startStage
			}

			if (curr._id === startStage._id) {
				return dropStage
			}

			return curr
		})

		onChangeStages(changedStages)
	}
	return (
		<List
			arr={tasks}
			callback={task => (
				<TaskBoard
					onDragEnd={dragEndHandler}
					onDragStart={e => dragStartHandler(e, task, stage)}
					onDragOver={dragOverHandler}
					onDragLeave={dragLeaveHandler}
					onDrop={e => dropHandler(e, task, stage)}
					draggable={true}
					data-id={task._id}
					key={task._id}
					task={task}
					stageId={stage._id}
				/>
			)}
		/>
	)
}
