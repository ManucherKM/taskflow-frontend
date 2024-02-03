import { useBoardStore, useStageStore, useUpdateStageStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { IStage } from '@/storage/useStageStore/types'
import { type FC, type ReactNode } from 'react'
import { toast } from '.'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from './ui/context-menu'

export interface IStageContextMenu {
	children: ReactNode
	stage: IStage
}

export const StageContextMenu: FC<IStageContextMenu> = ({
	children,
	stage,
}) => {
	const remove = useStageStore(store => store.remove)
	const duplication = useStageStore(store => store.duplication)
	const setIsShowUpdate = useUpdateStageStore(store => store.setIsShow)
	const setStageId = useUpdateStageStore(store => store.setStageId)
	const setActiveBoard = useBoardStore(store => store.setActiveBoard)
	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	async function duplicationHandler() {
		try {
			const createdStage = await duplication(stage._id)

			if (!createdStage) {
				toast({
					title: 'Не удалось дублировать этап',
				})
				return
			}

			const foundIdx = activeBoard.stages.findIndex(
				curr => curr._id === stage._id,
			)

			const newStages = [...activeBoard.stages]

			newStages.splice(foundIdx + 1, 0, createdStage as IStage)

			newStages.forEach(item => console.log(item._id))

			const newBoard = {
				...activeBoard,
				stages: newStages,
			}

			setActiveBoard(newBoard)

			toast({
				title: 'Этап успешно дублирован',
			})
		} catch (e) {
			console.log(e)
		}
	}

	async function updateHandler() {
		setStageId(stage._id)
		setIsShowUpdate(true)
	}

	async function removeHandler() {
		try {
			const isSuccess = await remove(stage._id)

			if (!isSuccess) {
				toast({
					title: 'Не удалось удалить этап',
				})
				return
			}

			const newStages = activeBoard.stages.filter(
				curr => curr._id !== stage._id,
			)

			const newBoard = { ...activeBoard, stages: newStages }

			setActiveBoard(newBoard)

			toast({
				title: 'Этап успешно удален',
			})
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={duplicationHandler}>
					Дублировать
				</ContextMenuItem>
				<ContextMenuItem onClick={updateHandler}>Изменить</ContextMenuItem>
				<ContextMenuItem className="text-red-400" onClick={removeHandler}>
					Удалить
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
