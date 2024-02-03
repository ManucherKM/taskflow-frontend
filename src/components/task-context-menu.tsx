import { useBoardStore, useOpenTaskStore, useTaskStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { ITask } from '@/storage/useTaskStore/types'
import type { FC, ReactNode } from 'react'
import { toast } from '.'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from './ui/context-menu'

export interface ITaskContextMenu {
	children: ReactNode
	task: ITask
}

export const TaskContextMenu: FC<ITaskContextMenu> = ({ children, task }) => {
	const remove = useTaskStore(store => store.remove)
	const duplication = useTaskStore(store => store.duplication)
	const setIsShowTask = useOpenTaskStore(store => store.setIsShow)
	const setTaskInfo = useOpenTaskStore(store => store.setTask)

	const setActiveBoard = useBoardStore(store => store.setActiveBoard)
	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	function openHandler() {
		setTaskInfo(task)
		setIsShowTask(true)
	}

	async function duplicationHandler() {
		try {
			const createdTask = await duplication(task._id)

			if (!createdTask) {
				toast({
					title: 'Не удалось дублировать задачу',
				})
				return
			}

			const newStages = [...activeBoard.stages]

			let isFound = false

			for (let i = 0; i < newStages.length; i++) {
				if (isFound) break

				const stage = newStages[i]
				for (let j = 0; j < stage.tasks.length; j++) {
					if (isFound) break

					const currTask = stage.tasks[j]

					if (currTask._id === task._id) {
						newStages[i].tasks.splice(j + 1, 0, createdTask as ITask)
						isFound = true
					}
				}
			}

			const newBoard = {
				...activeBoard,
				stages: newStages,
			}

			setActiveBoard(newBoard)

			toast({
				title: 'Задача успешно дублирована',
			})
		} catch (e) {
			console.log(e)
		}
	}

	async function updateHandler() {}

	async function removeHandler() {
		try {
			const isSuccess = await remove(task._id)

			if (!isSuccess) {
				toast({
					title: 'Не удалось удалить задачу',
				})
				return
			}

			const newStages = activeBoard.stages.map(stage => {
				if (stage.tasks.length === 0) {
					return stage
				}

				stage.tasks = stage.tasks.filter(curr => curr._id !== task._id)

				return stage
			})

			const newBoard = { ...activeBoard, stages: newStages }

			setActiveBoard(newBoard)

			toast({
				title: 'Задача успешно удалена',
			})
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={openHandler}>Открыть</ContextMenuItem>
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
