import { useUpdateStageStore } from '@/storage'
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
	const setIsShowUpdateBoard = useUpdateStageStore(store => store.setIsShow)
	const setStageId = useUpdateStageStore(store => store.setStageId)

	function boardChangeHandler() {
		setStageId(stage._id)
		setIsShowUpdateBoard(true)
	}

	return (
		<Card className="w-[300px] h-fit">
			<CardHeader className="p-4 flex flex-row justify-between group">
				<CardTitle>{stage.name}</CardTitle>
				<Button
					variant={'ghost'}
					size={'icon'}
					className="p-[3px] !m-0 w-fit h-fit opacity-0 group-hover:opacity-100"
					onClick={boardChangeHandler}
				>
					<Icons.pencil />
				</Button>
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
