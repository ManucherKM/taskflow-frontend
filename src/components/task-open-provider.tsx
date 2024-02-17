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
import { useTranslation } from 'react-i18next'

export interface IOpenTaskProvider {
	children: ReactNode
}

export const OpenTaskProvider: FC<IOpenTaskProvider> = ({ children }) => {
	const { t } = useTranslation()
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
				<DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-auto">
					<DialogHeader className="max-w-[inherit] w-full mt-3">
						<DialogTitle className="break-all">
							{task?.title || t('not_found')}
						</DialogTitle>
						<DialogDescription className="break-all !mt-6 text-justify">
							{task?.description || t('not_found')}
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="pr-2">
						<DialogClose asChild>
							<Button ref={closeButtonRef} type="button">
								{t('close')}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
