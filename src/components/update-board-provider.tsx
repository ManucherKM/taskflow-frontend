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
import { useTranslation } from 'react-i18next'
import { toast } from './ui/use-toast'

export interface IUpdateBoardProvider {
	children: ReactNode
}

export const UpdateBoardProvider: FC<IUpdateBoardProvider> = ({ children }) => {
	const { t } = useTranslation()

	const isShow = useUpdateBoardStore(store => store.isShow)
	const setIsShow = useUpdateBoardStore(store => store.setIsShow)
	const id = useUpdateBoardStore(store => store.id)

	const createButtonRef = useRef<HTMLButtonElement | null>(null)

	const [name, setName] = useState<string>('')

	const loader = useLoader()

	const update = useBoardStore(store => store.update)

	const boards = useBoardStore(store => store.boards)

	const setBoards = useBoardStore(store => store.setBoards)

	async function onUpdateSubmit() {
		if (!id.length) return

		try {
			const updatedBoard = await loader(update, id, { name })

			if (!updatedBoard) {
				toast({
					title: t('failed_to_update_the_board'),
				})

				return
			}

			const newBoards = boards.map(board => {
				if (board._id === updatedBoard._id) {
					return updatedBoard
				}

				return board
			})

			setBoards(newBoards)

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
						<DialogTitle>{t('update_the_board')}</DialogTitle>
						<DialogDescription>
							{t('fill_out_the_form_to_update_the_board')}
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-6 py-4">
						<Label htmlFor="name">
							{t('title')}
							<Input
								id="name"
								value={name}
								onChange={e => setName(e.target.value)}
								className="w-full mt-2"
								placeholder={t('work')}
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
								{t('update')}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
