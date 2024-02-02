import { IStage } from '@/storage/useBoardStore/types'
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
import { TaskBoardTist } from './task-board-list'

export interface IStageBoard {
	stage: IStage
}

export const StageBoard: FC<IStageBoard> = ({ stage }) => {
	return (
		<Card className="w-[300px]">
			<CardHeader className="p-4">
				<CardTitle>{stage.name}</CardTitle>
			</CardHeader>
			{stage.tasks.length !== 0 && (
				<CardContent>
					<div className="w-full flex flex-col ">
						<TaskBoardTist tasks={stage.tasks} />
					</div>
				</CardContent>
			)}
			<CardFooter className="p-4 pt-0">
				<Button variant={'ghost'} className="flex gap-2 w-full">
					<Icons.plus />
					Создать новую задачу
				</Button>
			</CardFooter>
		</Card>
	)
}
