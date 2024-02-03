import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useOpenTaskStore } from '@/storage'
import { DialogClose } from '@radix-ui/react-dialog'
import { useEffect, useRef, type FC, type ReactNode } from 'react'

export interface IOpenTaskProvider {
	children: ReactNode
}

export const OpenTaskProvider: FC<IOpenTaskProvider> = ({ children }) => {
	const isShow = useOpenTaskStore(store => store.isShow)
	const setIsShow = useOpenTaskStore(store => store.setIsShow)
	const task = useOpenTaskStore(store => store.task)

	const closeButtonRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		if (!closeButtonRef.current) return

		closeButtonRef.current.focus()
	}, [closeButtonRef.current])
	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{task?.title || 'Не найдено'}</DialogTitle>
						<DialogDescription className="!mt-6 text-justify">
							{task?.description || 'Не найдено'}
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button ref={closeButtonRef} type="button">
								Закрыть
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
