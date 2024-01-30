import { useLoader } from '@/hooks'
import { useMultipleBoardActionStore } from '@/storage/useMultipleBoardActionsStore/useMultipleBoardActionsStore'
import { FC, ReactNode } from 'react'
import { Button, TypographyP, toast } from '.'

export const MultipleBoardActions = () => {
	const selectedBoards = useMultipleBoardActionStore(
		store => store.selectedBoards,
	)

	const setSelectedBoards = useMultipleBoardActionStore(
		store => store.setSelectedBoards,
	)

	const loader = useLoader()

	const remove = useMultipleBoardActionStore(store => store.remove)

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
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div>
			<TypographyP>Выбранно: {selectedBoards.length}</TypographyP>

			<div>
				<Button onClick={removeHandler}>Удалить</Button>
			</div>
		</div>
	)
}

export interface IMultipleBoardActionsProvider {
	children: ReactNode
}

export const MultipleBoardActionsProvider: FC<
	IMultipleBoardActionsProvider
> = ({ children }) => {
	const selectedBoards = useMultipleBoardActionStore(
		store => store.selectedBoards,
	)
	return (
		<>
			{selectedBoards.length > 1 && <MultipleBoardActions />}
			{children}
		</>
	)
}
