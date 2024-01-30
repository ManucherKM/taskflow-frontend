import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useBoardStore, useUpdateBoardStore } from '@/storage'
import { IBoard } from '@/storage/useBoardStore/types'
import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { toast } from '.'

export interface IBoardActionContextMenu {
	children: ReactNode
	board: IBoard
}

export const BoardActionContextMenu: FC<IBoardActionContextMenu> = ({
	children,
	board,
}) => {
	const setIsShow = useUpdateBoardStore(store => store.setIsShow)

	const setId = useUpdateBoardStore(store => store.setId)

	const navigate = useNavigate()

	const loader = useLoader()

	const update = useBoardStore(store => store.update)

	const getAllBoards = useBoardStore(store => store.getAllBoards)

	const remove = useBoardStore(store => store.remove)

	function openHandler() {
		navigate(ERoutes.board + '/' + board._id)
	}

	function changeHandler() {
		setId(board._id)
		setIsShow(true)
	}

	async function favoriteHandler() {
		try {
			const updatedBoard = await loader(update, board._id, {
				isFavorite: !board.isFavorite,
			})

			if (!updatedBoard) {
				toast({
					title: 'Не удалось обновить доску',
				})
				return
			}

			const fetchedBoards = await getAllBoards()

			if (!fetchedBoards) {
				toast({
					title: 'Не удалось получить список досок',
				})
				return
			}
		} catch (e) {
			console.log(e)
		}
	}

	async function removeHandler() {
		try {
			const isSuccess = await loader(remove, board._id)

			if (!isSuccess) {
				toast({
					title: 'Не удалось удалить доску',
				})
				return
			}

			const fetchedBoards = await getAllBoards()

			if (!fetchedBoards) {
				toast({
					title: 'Не удалось получить список досок',
				})
				return
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent className="w-64">
				<ContextMenuItem inset onClick={openHandler}>
					Открыть
				</ContextMenuItem>

				<ContextMenuItem inset onClick={changeHandler}>
					Редактировать
				</ContextMenuItem>

				<ContextMenuItem inset onClick={favoriteHandler}>
					{board.isFavorite ? 'Убрать из избранного' : ' В избранное'}
				</ContextMenuItem>

				<ContextMenuItem inset onClick={removeHandler}>
					Удалить
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
