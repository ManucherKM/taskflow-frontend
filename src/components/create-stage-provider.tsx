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
import { useBoardStore, useCreateStageStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { DialogClose } from '@radix-ui/react-dialog'
import { MouseEvent, useRef, useState, type FC, type ReactNode } from 'react'
import { toast } from './ui/use-toast'

export interface ICreateStageProvider {
	children: ReactNode
}

export const CreateStageProvider: FC<ICreateStageProvider> = ({ children }) => {
	const isShow = useCreateStageStore(store => store.isShow)
	const setIsShow = useCreateStageStore(store => store.setIsShow)
	const boardId = useCreateStageStore(store => store.boardId)

	const createButtonRef = useRef<HTMLButtonElement | null>(null)

	const [name, setName] = useState<string>('')

	const loader = useLoader()

	const create = useCreateStageStore(store => store.create)

	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	async function onSubmit() {
		try {
			const createdStage = await loader(create, { name, boardId })

			if (!createdStage) {
				toast({
					title: 'Не удалось создать этап',
				})

				return
			}

			const newBoard = {
				...activeBoard,
				stages: [...activeBoard.stages, createdStage],
			} as IDeepBoard

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
						<DialogTitle>Создать этап</DialogTitle>
						<DialogDescription>
							Заполните форму чтобы создать этап.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-6 py-4">
						<Label htmlFor="name">
							Название
							<Input
								id="name"
								value={name}
								onChange={e => setName(e.target.value)}
								className="w-full mt-2"
								placeholder="В планах..."
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
								disabled={!name.length}
								onClick={submitHandler}
							>
								Создать
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
