import { useBoardStore, useStageStore, useUpdateStageStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { IStage } from '@/storage/useStageStore/types'
import { type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
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
	boardId: string
}

export const StageContextMenu: FC<IStageContextMenu> = ({
	children,
	stage,
	boardId,
}) => {
	const { t } = useTranslation()

	const remove = useStageStore(store => store.remove)
	const duplication = useStageStore(store => store.duplication)
	const setIsShowUpdate = useUpdateStageStore(store => store.setIsShow)
	const setStage = useUpdateStageStore(store => store.setStage)
	const setActiveBoard = useBoardStore(store => store.setActiveBoard)
	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	async function duplicationHandler() {
		try {
			const createdStage = await duplication(stage._id, boardId)

			if (!createdStage) {
				toast({
					title: t('failed_to_duplicate_a_step'),
				})
				return
			}

			const foundIdx = activeBoard.stages.findIndex(
				curr => curr._id === stage._id,
			)

			const newStages = [...activeBoard.stages]

			newStages.splice(foundIdx + 1, 0, createdStage as IStage)

			const newBoard = {
				...activeBoard,
				stages: newStages,
			}

			setActiveBoard(newBoard)

			toast({
				title: t('stage_successfully_duplicated'),
			})
		} catch (e) {
			console.error(e)
		}
	}

	async function updateHandler() {
		setStage(stage)
		setIsShowUpdate(true)
	}

	async function removeHandler() {
		try {
			const isSuccess = await remove(stage._id)

			if (!isSuccess) {
				toast({
					title: t('failed_to_delete_a_step'),
				})
				return
			}

			const newStages = activeBoard.stages.filter(
				curr => curr._id !== stage._id,
			)

			const newBoard = { ...activeBoard, stages: newStages }

			setActiveBoard(newBoard)

			toast({
				title: t('stage_successfully_deleted'),
			})
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={duplicationHandler}>
					{t('duplicate')}
				</ContextMenuItem>
				<ContextMenuItem onClick={updateHandler}>{t('modify')}</ContextMenuItem>
				<ContextMenuItem className="text-red-400" onClick={removeHandler}>
					{t('delete')}
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
