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
import { useBoardStore, useUpdateStageStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { DialogClose } from '@radix-ui/react-dialog'
import { MouseEvent, useRef, useState, type FC, type ReactNode } from 'react'
import { toast } from './ui/use-toast'

export interface IUpdateStageProvider {
	children: ReactNode
}

export const UpdateStageProvider: FC<IUpdateStageProvider> = ({ children }) => {
	const isShow = useUpdateStageStore(store => store.isShow)

	const setIsShow = useUpdateStageStore(store => store.setIsShow)

	const stageId = useUpdateStageStore(store => store.stageId)

	const updateButtonRef = useRef<HTMLButtonElement | null>(null)

	const [name, setName] = useState<string>('')

	const loader = useLoader()

	const update = useUpdateStageStore(store => store.update)

	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	async function onSubmit() {
		try {
			const updatedStage = await loader(update, { name })

			if (!updatedStage) {
				toast({
					title: 'Не удалось изменить этап',
				})

				return
			}

			const newBoard = {
				...activeBoard,
				stages: [
					...activeBoard.stages.map(stage => {
						if (stage._id === stageId) {
							return {
								...stage,
								name,
							}
						}

						return stage
					}),
				],
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
						<DialogTitle>Изменить этап</DialogTitle>
						<DialogDescription>
							Заполните форму чтобы изменить этап.
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
										updateButtonRef.current?.click()
									}
								}}
							/>
						</Label>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								ref={updateButtonRef}
								type="submit"
								disabled={!name.length}
								onClick={submitHandler}
							>
								Обновить
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
