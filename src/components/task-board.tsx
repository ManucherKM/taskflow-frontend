import { cn } from '@/lib/utils'
import { ITask } from '@/storage/useTaskStore/types'
import type { ButtonHTMLAttributes, FC } from 'react'
import { CustomTooltip } from './custom-tooltip'
import { TaskContextMenu } from './task-context-menu'
import { Button } from './ui/button'

export interface ITaskBoard extends ButtonHTMLAttributes<HTMLButtonElement> {
	task: ITask
	stageId: string
}

export const TaskBoard: FC<ITaskBoard> = ({
	task,
	stageId,
	className,
	...props
}) => {
	return (
		<TaskContextMenu task={task} stageId={stageId}>
			<CustomTooltip text="Нажмите на правую кнопку мыши чтобы открыть меню опций задачи">
				<Button
					className={cn(['justify-start group w-full cursor-grab', className])}
					{...props}
				>
					{task.title}
				</Button>
			</CustomTooltip>
		</TaskContextMenu>
	)
}
