import { useLoader, useOutsideClick } from '@/hooks'
import { useBoardStore } from '@/storage'
import { useMultipleBoardActionStore } from '@/storage/useMultipleBoardActionsStore/useMultipleBoardActionsStore'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { Button, TypographyP, toast } from '.'

import { motion } from 'framer-motion'

export const MultipleBoardActions = () => {
	const setIsShow = useMultipleBoardActionStore(store => store.setIsShow)

	const selectedBoards = useMultipleBoardActionStore(
		store => store.selectedBoards,
	)

	const setSelectedBoards = useMultipleBoardActionStore(
		store => store.setSelectedBoards,
	)

	const remove = useMultipleBoardActionStore(store => store.remove)

	const getAllBoards = useBoardStore(store => store.getAllBoards)

	const loader = useLoader()

	const containerRef = useRef<HTMLDivElement | null>(null)

	const isClickNodeContain = useOutsideClick(containerRef)

	async function removeHandler() {
		try {
			const isSuccess = await loader(remove, selectedBoards)

			if (!isSuccess) {
				toast({
					title: 'Не удалось удалить выбранные доски',
				})
				return
			}

			setSelectedBoards([])

			const fetchedBoards = await loader(getAllBoards)

			if (!fetchedBoards) {
				toast({
					title: 'Не удалось получить список досок',
				})
				return
			}
		} catch (e) {
			console.log(e)
		} finally {
			setIsShow(false)
		}
	}

	useEffect(() => {
		if (isClickNodeContain === null) return

		if (!isClickNodeContain) {
			setIsShow(false)
			setSelectedBoards([])
		}
	}, [isClickNodeContain])
	return (
		<motion.div
			ref={containerRef}
			initial={{ y: '-100px' }}
			animate={{ y: '0' }}
			exit={{ y: '-100px' }}
			transition={{ duration: '0.4', type: 'spring', bounce: 0.4 }}
			className="fixed w-full flex justify-between items-center p-4 bg-background border-b z-50"
		>
			<TypographyP>Выбранно: {selectedBoards.length}</TypographyP>

			<div>
				<Button variant={'ghost'} onClick={removeHandler}>
					Удалить
				</Button>
			</div>
		</motion.div>
	)
}

export interface IMultipleBoardActionsProvider {
	children: ReactNode
}

export const MultipleBoardActionsProvider: FC<
	IMultipleBoardActionsProvider
> = ({ children }) => {
	const isShow = useMultipleBoardActionStore(store => store.isShow)

	return (
		<>
			{isShow && <MultipleBoardActions />}
			{children}
		</>
	)
}
