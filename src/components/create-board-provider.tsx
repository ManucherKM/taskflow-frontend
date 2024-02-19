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
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useBoardStore, useCraeteBoardStore } from '@/storage'
import { DialogClose } from '@radix-ui/react-dialog'
import { MouseEvent, useRef, useState, type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from './ui/use-toast'

export interface ICreateBoardProvider {
	children: ReactNode
}

export const CreateBoardProvider: FC<ICreateBoardProvider> = ({ children }) => {
	const { t } = useTranslation()

	const isShow = useCraeteBoardStore(store => store.isShow)

	const setIsShow = useCraeteBoardStore(store => store.setIsShow)

	const createButtonRef = useRef<HTMLButtonElement | null>(null)

	const [name, setName] = useState<string>('')

	const create = useBoardStore(store => store.create)

	const loader = useLoader()

	const navigate = useNavigate()

	async function onCreateSubmit() {
		try {
			const createdBoard = await loader(create, { name })

			if (!createdBoard) {
				toast({
					title: t('failed_to_create_a_board'),
				})

				return
			}

			setIsShow(false)

			navigate(ERoutes.dashboard + '/' + createdBoard._id)
		} catch (e) {
			console.error(e)
		} finally {
			setName('')
		}
	}

	function submitHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		onCreateSubmit()
	}

	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{t('new_board')}</DialogTitle>
						<DialogDescription>
							{t('fill_out_the_form_to_create_a_new_board')}
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
