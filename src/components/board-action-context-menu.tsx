import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useBoardStore, useUpdateBoardStore, useUserStore } from '@/storage'
import { IBoard } from '@/storage/useBoardStore/types'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
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
	const { t } = useTranslation()

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
		navigate(ERoutes.dashboard + '/' + board._id)
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
		} catch (e) {
			console.log(e)
		}
	}

	async function leaveHandler() {
		try {
			const savedBoard = await loader(leave, board._id)

			if (!savedBoard) {
				toast({
					title: t('failed_to_leave_the_board'),
				})
				return
			}

			const newBoards = boards.filter(board => board._id !== savedBoard._id)

			setBoards(newBoards)

			toast({
				title: t('the_board_has_been_successfully_abandoned'),
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
					title: t('failed_to_remove_the_board'),
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
			<ContextMenuContent className="w-48">
				<ContextMenuItem onClick={openHandler}>{t('open')}</ContextMenuItem>

				<ContextMenuItem onClick={changeHandler}>{t('edit')}</ContextMenuItem>

				<ContextMenuItem onClick={favoriteHandler}>
					{board.isFavorite ? t('unfavorite') : t('into_favorites')}
				</ContextMenuItem>

				<ContextMenuSeparator />

				<ContextMenuItem onClick={leaveHandler} className="text-red-400">
					{t('leave')}
				</ContextMenuItem>

				{!!user && board.admins.includes(user._id) && (
					<ContextMenuItem onClick={removeHandler} className="text-red-400">
						{t('delete')}
					</ContextMenuItem>
				)}
			</ContextMenuContent>
		</ContextMenu>
	)
}
