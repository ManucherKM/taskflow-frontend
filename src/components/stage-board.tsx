import { useCreateTaskStore } from '@/storage'

import { IStage } from '@/storage/useStageStore/types'
import type { FC } from 'react'
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
import { TaskBoardList } from './task-board-list'

export interface IStageBoard {
	stage: IStage
}

export const StageBoard: FC<IStageBoard> = ({ stage }) => {
	const setIsShowCreateTask = useCreateTaskStore(store => store.setIsShow)
	const setStageIdCreateTask = useCreateTaskStore(store => store.setStageId)

	function taskCreateHandler() {
		setStageIdCreateTask(stage._id)
		setIsShowCreateTask(true)
	}

	return (
		<StageContextMenu stage={stage}>
			<Card className="w-[300px] h-fit cursor-grab">
				<CustomTooltip text="Нажмите на правую кнопку мыши чтобы открыть меню опций этапа">
					<CardHeader className="p-4 pb-6">
						<CardTitle>{stage.name}</CardTitle>
					</CardHeader>
				</CustomTooltip>

				{stage.tasks.length !== 0 && (
					<CardContent className="pb-4">
						<div className="w-full flex flex-col gap-2">
							<TaskBoardList tasks={stage.tasks} stageId={stage._id} />
						</div>
					</CardContent>
				)}
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
