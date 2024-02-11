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
import { useBoardStore, useCreateTaskStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { DialogClose } from '@radix-ui/react-dialog'
import { MouseEvent, useRef, useState, type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'

export interface ICreateTaskProvider {
	children: ReactNode
}

export const CreateTaskProvider: FC<ICreateTaskProvider> = ({ children }) => {
	const { t } = useTranslation()

	const isShow = useCreateTaskStore(store => store.isShow)
	const setIsShow = useCreateTaskStore(store => store.setIsShow)
	const stageId = useCreateTaskStore(store => store.stageId) as string

	const createButtonRef = useRef<HTMLButtonElement | null>(null)

	const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null)

	const [title, setTitle] = useState<string>('')

	const [description, setDescription] = useState<string>('')

	const loader = useLoader()

	const create = useCreateTaskStore(store => store.create)

	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	async function onSubmit() {
		try {
			const createdTask = await loader(create, { title, description, stageId })

			if (!createdTask) {
				toast({
					title: t('failed_to_create_a_task'),
				})

				return
			}

			const newBoard = {
				...activeBoard,
				stages: activeBoard.stages.map(stage => {
					if (stage._id === stageId) {
						stage.tasks.push(createdTask)
					}

					return stage
				}),
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
						<DialogTitle>{t('create_a_task')}</DialogTitle>
						<DialogDescription>
							{t('fill_out_the_form_to_create_a_task')}
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-6 py-4">
						<Label htmlFor="title">
							{t('caption')}
							<Input
								id="title"
								value={title}
								onChange={e => setTitle(e.target.value)}
								className="w-full mt-2"
								placeholder={t('fill_out_the_document') + '...'}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										descriptionInputRef.current?.focus()
									}
								}}
							/>
						</Label>
						<Label htmlFor="description">
							{t('description')}
							<Textarea
								id="description"
								ref={descriptionInputRef}
								value={description}
								onChange={e => setDescription(e.target.value)}
								className="w-full mt-2"
								placeholder={t('get_the_document_on_the_second_shelf') + '...'}
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
								{t('create')}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
