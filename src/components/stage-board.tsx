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
				<CardHeader className="p-4">
					<CardTitle>{stage.name}</CardTitle>
				</CardHeader>
				{stage.tasks.length !== 0 && (
					<CardContent>
						<div className="w-full flex flex-col gap-2">
							<TaskBoardList tasks={stage.tasks} />
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
