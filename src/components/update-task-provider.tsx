import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoader } from '@/hooks'
import { useBoardStore, useUpdateTaskStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { DialogClose } from '@radix-ui/react-dialog'
import { MouseEvent, useRef, useState, type FC, type ReactNode } from 'react'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'

export interface IUpdateTaskProvider {
	children: ReactNode
}

export const UpdateTaskProvider: FC<IUpdateTaskProvider> = ({ children }) => {
	const isShow = useUpdateTaskStore(store => store.isShow)
	const setIsShow = useUpdateTaskStore(store => store.setIsShow)
	const taskId = useUpdateTaskStore(store => store.taskId)

	const createButtonRef = useRef<HTMLButtonElement | null>(null)

	const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null)

	const [title, setTitle] = useState<string>('')

	const [description, setDescription] = useState<string>('')

	const loader = useLoader()

	const update = useUpdateTaskStore(store => store.update)

	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	async function onSubmit() {
		try {
			const isSuccess = await loader(update, { title, description })

			if (!isSuccess) {
				toast({
					title: 'Не удалось обновить задачу',
				})

				return
			}

			const newStages = activeBoard.stages.map(stage => {
				const foundIdx = stage.tasks.findIndex(task => task._id === taskId)

				if (foundIdx !== -1) {
					stage.tasks[foundIdx].title = title
					stage.tasks[foundIdx].description = description
				}

				return stage
			})

			const newBoard = {
				...activeBoard,
				stages: newStages,
			}

			setActiveBoard(newBoard)

			setIsShow(false)
		} catch (e) {
			console.error(e)
		}
	}

	function submitHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		onSubmit()
	}

	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Изменить задачу</DialogTitle>
						<DialogDescription>
							Заполните форму чтобы изменить задачу.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-6 py-4">
						<Label htmlFor="title">
							Заголовок
							<Input
								id="title"
								value={title}
								onChange={e => setTitle(e.target.value)}
								className="w-full mt-2"
								placeholder="Заполнить документ..."
								onKeyDown={e => {
									if (e.key === 'Enter') {
										descriptionInputRef.current?.focus()
									}
								}}
							/>
						</Label>
						<Label htmlFor="description">
							Описание
							<Textarea
								id="description"
								ref={descriptionInputRef}
								value={description}
								onChange={e => setDescription(e.target.value)}
								className="w-full mt-2"
								placeholder="Взять документ на 2й полке..."
								onKeyDown={e => {
									if (e.key === 'Enter') {
										createButtonRef.current?.click()
									}
								}}
							/>
						</Label>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								ref={createButtonRef}
								type="submit"
								disabled={!title.length || !description.length}
								onClick={submitHandler}
							>
								Изменить
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
