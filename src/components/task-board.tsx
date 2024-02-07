import { cn } from '@/lib/utils'
import { ITask } from '@/storage/useTaskStore/types'
import type { FC, HTMLAttributes } from 'react'
import { CustomTooltip } from './custom-tooltip'
import { TaskContextMenu } from './task-context-menu'

export interface ITaskBoard extends HTMLAttributes<HTMLDivElement> {
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
				<div
					className={cn([
						'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 justify-start group cursor-grab my-1 w-full',
						className,
					])}
					{...props}
				>
					{task.title}
				</div>
			</CustomTooltip>
		</TaskContextMenu>
	)
}
