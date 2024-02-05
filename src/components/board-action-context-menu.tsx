import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useBoardStore, useUpdateBoardStore, useUserStore } from '@/storage'
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
	const user = useUserStore(store => store.user)

	const setIsShow = useUpdateBoardStore(store => store.setIsShow)

	const setId = useUpdateBoardStore(store => store.setId)

	const navigate = useNavigate()

	const loader = useLoader()

	const update = useBoardStore(store => store.update)

	const leave = useBoardStore(store => store.leave)

	const remove = useBoardStore(store => store.remove)

	const boards = useBoardStore(store => store.boards)

	const setBoards = useBoardStore(store => store.setBoards)

	function openHandler() {
		navigate(ERoutes.board + '/' + board._id)
	}

	function changeHandler() {
		setId(board._id)
		setIsShow(true)
	}

	async function favoriteHandler() {
		try {
			console.log(board)

			const updatedBoard = await loader(update, board._id, {
				isFavorite: !board.isFavorite,
			})

			if (!updatedBoard) {
				toast({
					title: 'Не удалось обновить доску',
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
		} catch (e) {
			console.log(e)
		}
	}

	async function leaveHandler() {
		try {
			const savedBoard = await loader(leave, board._id)

			if (!savedBoard) {
				toast({
					title: 'Не удалось покинуть доску',
				})
				return
			}

			const newBoards = boards.filter(board => board._id !== savedBoard._id)

			setBoards(newBoards)

			toast({
				title: 'Доска успешно покинута',
			})
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

				<ContextMenuItem inset onClick={leaveHandler} className="text-red-400">
					Покинуть
				</ContextMenuItem>

				{!!user && board.admins.includes(user._id) && (
					<ContextMenuItem
						inset
						onClick={removeHandler}
						className="text-red-400"
					>
						Удалить
					</ContextMenuItem>
				)}
			</ContextMenuContent>
		</ContextMenu>
	)
}
