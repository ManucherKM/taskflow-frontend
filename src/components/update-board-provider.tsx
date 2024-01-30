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
import { useBoardStore, useUpdateBoardStore } from '@/storage'
import { DialogClose } from '@radix-ui/react-dialog'
import { MouseEvent, useRef, useState, type FC, type ReactNode } from 'react'
import { toast } from './ui/use-toast'

export interface IUpdateBoardProvider {
	children: ReactNode
}

export const UpdateBoardProvider: FC<IUpdateBoardProvider> = ({ children }) => {
	const isShow = useUpdateBoardStore(store => store.isShow)
	const setIsShow = useUpdateBoardStore(store => store.setIsShow)
	const id = useUpdateBoardStore(store => store.id)

	const createButtonRef = useRef<HTMLButtonElement | null>(null)

	const [name, setName] = useState<string>('')

	const loader = useLoader()

	const update = useBoardStore(store => store.update)

	async function onUpdateSubmit() {
		if (!id.length) return

		try {
			const updatedBoard = await loader(update, id, { name })

			if (!updatedBoard) {
				toast({
					title: 'Не удалось обновить доску',
				})

				return
			}

			setIsShow(false)
		} catch (e) {
			console.error(e)
		}
	}

	function submitHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		onUpdateSubmit()
	}

	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Обновить доску</DialogTitle>
						<DialogDescription>
							Заполните форму чтобы обновить доску.
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
								placeholder="Горящие арбузы"
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