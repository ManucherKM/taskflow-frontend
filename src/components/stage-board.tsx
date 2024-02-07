import { useCreateTaskStore } from '@/storage'

import { cn } from '@/lib/utils'
import { IStage } from '@/storage/useStageStore/types'
import type { FC, HTMLAttributes } from 'react'
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Icons,
} from '.'
import { CustomTooltip } from './custom-tooltip'
import { StageContextMenu } from './stage-context-menu'
import { StrictModeDroppable } from './strict-mode-droppable '
import { TaskBoardList } from './task-board-list'

export interface IStageBoard extends HTMLAttributes<HTMLDivElement> {
	stage: IStage
	boardId: string
}

export const StageBoard: FC<IStageBoard> = ({
	stage,
	boardId,
	className,
	...props
}) => {
	const setIsShowCreateTask = useCreateTaskStore(store => store.setIsShow)
	const setStageIdCreateTask = useCreateTaskStore(store => store.setStageId)

	function taskCreateHandler() {
		setStageIdCreateTask(stage._id)
		setIsShowCreateTask(true)
	}

	return (
		<StageContextMenu stage={stage} boardId={boardId}>
			<Card
				className={cn([
					'w-[300px] h-fit cursor-grab hover:border-foreground transition-all',
					className,
				])}
				{...props}
			>
				<CustomTooltip text="Нажмите на правую кнопку мыши чтобы открыть меню опций этапа">
					<CardHeader className="p-4 pb-6">
						<CardTitle>{stage.name}</CardTitle>
					</CardHeader>
				</CustomTooltip>

				<StrictModeDroppable
					key={stage._id}
					droppableId={stage._id}
					direction="vertical"
					type="ROW"
				>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							key={stage._id}
							{...provided.droppableProps}
						>
							<CardContent className="pb-4">
								<div className="w-full flex flex-col">
									<TaskBoardList tasks={stage.tasks} stageId={stage._id} />
									{provided.placeholder}
								</div>
							</CardContent>
						</div>
					)}
				</StrictModeDroppable>

				<CardFooter className="p-4 pt-0">
					<Button
						variant={'ghost'}
						className="flex gap-2 w-full"
						onClick={taskCreateHandler}
					>
						<Icons.plus />
						Создать новую задачу
					</Button>
				</CardFooter>
			</Card>
		</StageContextMenu>
	)
}
