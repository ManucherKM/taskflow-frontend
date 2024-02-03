import { ITask } from '@/storage/useBoardStore/types'
import type { FC } from 'react'
import { CustomTooltip } from './stage-tooltip'
import { TaskContextMenu } from './task-context-menu'
import { Button } from './ui/button'

export interface ITaskBoard {
	task: ITask
}

export const TaskBoard: FC<ITaskBoard> = ({ task }) => {
	return (
		<TaskContextMenu>
			<CustomTooltip text="Нажмите на правую кнопку мыши чтобы открыть меню опций задачи">
				<Button className="justify-start group w-full cursor-grab">
					{task.title}
				</Button>
			</CustomTooltip>
		</TaskContextMenu>
	)
}
