import { useBoardStore, useStageStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { IStage } from '@/storage/useStageStore/types'
import { type FC } from 'react'
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { List, toast } from '.'
import { StageBoard } from './stage-board'
import { StrictModeDroppable } from './strict-mode-droppable '

export interface IStageBoardList {
	stages: IStage[]
	boardId: string
}

export type TDragType = 'ROW' | 'STAGE' | null

export const StageBoardList: FC<IStageBoardList> = ({ stages, boardId }) => {
	const { t } = useTranslation()

	const setBoard = useBoardStore(store => store.setActiveBoard)
	const board = useBoardStore(store => store.activeBoard) as IDeepBoard

	const updateBoard = useBoardStore(store => store.update)

	const updateStage = useStageStore(store => store.update)

	async function dragEndHandler(e: DropResult) {
		if (!e.destination) return

		const { destination, source } = e

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return
		}

		if (e.type === 'STAGE') {
			const newBoard = { ...board }

			const [removedStage] = newBoard.stages.splice(e.source.index, 1)

			newBoard.stages.splice(e.destination.index, 0, removedStage)

			setBoard(newBoard)

			try {
				const updatedBoard = await updateBoard(boardId, {
					stages: newBoard.stages.map(stage => stage._id),
				})

				if (!updatedBoard) {
					toast({
						title: t('it_was_not_possible_to_change_the_order_of_the_stages'),
					})
					return
				}

				toast({
					title: t('the_order_has_been_successfully_changed'),
				})
			} catch (e) {
				console.error(e)
			}

			return
		}

		if (e.type === 'ROW') {
			if (source.droppableId !== destination.droppableId) {
				const sourceStage = board.stages.find(
					pred => pred._id === source.droppableId,
				) as IStage

				const destStage = board.stages.find(
					pred => pred._id === destination.droppableId,
				) as IStage

				const sourseTasks = [...sourceStage.tasks]

				const destTasks = [...destStage.tasks]

				const [removedTask] = sourseTasks.splice(source.index, 1)

				destTasks.splice(destination.index, 0, removedTask)

				const newStages = board.stages.map(stage => {
					if (stage._id === source.droppableId) {
						return {
							...stage,
							tasks: sourseTasks,
						}
					}

					if (stage._id === destination.droppableId) {
						return {
							...stage,
							tasks: destTasks,
						}
					}

					return stage
				})

				setBoard({
					...board,
					stages: newStages,
				})

				try {
					const [updatedSourceStage, updatedDestStage] = await Promise.all([
						updateStage(source.droppableId, {
							tasks: sourseTasks.map(stage => stage._id),
						}),
						updateStage(destination.droppableId, {
							tasks: destTasks.map(stage => stage._id),
						}),
					])

					if (!updatedSourceStage || !updatedDestStage) {
						toast({
							title: t('failed_to_change_the_order_of_tasks'),
						})
						return
					}

					toast({
						title: t('the_order_has_been_successfully_changed'),
					})
				} catch (e) {
					console.error(e)
				}
			} else {
				const foundStage = board.stages.find(
					pred => pred._id === source.droppableId,
				) as IStage

				const copiedTasks = [...foundStage.tasks]

				const [removedTask] = copiedTasks.splice(source.index, 1)

				copiedTasks.splice(destination.index, 0, removedTask)

				const newStages = board.stages.map(stage => {
					if (stage._id === foundStage._id) {
						return {
							...stage,
							tasks: copiedTasks,
						}
					}

					return stage
				})

				setBoard({
					...board,
					stages: newStages,
				})

				try {
					const updatedStage = await updateStage(foundStage._id, {
						tasks: copiedTasks.map(stage => stage._id),
					})

					if (!updatedStage) {
						toast({
							title: t('failed_to_change_the_order_of_tasks'),
						})
						return
					}

					toast({
						title: t('the_order_has_been_successfully_changed'),
					})
				} catch (e) {
					console.error(e)
				}
			}

			return
		}
	}

	return (
		<DragDropContext onDragEnd={dragEndHandler}>
			<StrictModeDroppable
				direction="horizontal"
				type="STAGE"
				droppableId="stage"
			>
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex"
					>
						<List
							arr={stages}
							callback={(stage, idx) => (
								<Draggable key={stage._id} draggableId={stage._id} index={idx}>
									{provided => (
										<div
											ref={provided.innerRef}
											key={stage._id}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<StageBoard
												boardId={boardId}
												key={stage._id}
												stage={stage}
												className="mx-2"
											/>
										</div>
									)}
								</Draggable>
							)}
						/>
						{provided.placeholder}
					</div>
				)}
			</StrictModeDroppable>
		</DragDropContext>
	)
}
