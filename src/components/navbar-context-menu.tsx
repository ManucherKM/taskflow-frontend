import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ERoutes } from '@/config/routes'
import { useAuthStore, useCraeteBoardStore } from '@/storage'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router'

export interface INavbarContextMenu {
	children: ReactNode
}

export const NavbarContextMenu: FC<INavbarContextMenu> = ({ children }) => {
	const navigation = useNavigate()
	const setIsShow = useCraeteBoardStore(store => store.setIsShow)
	const logout = useAuthStore(store => store.logout)

	function backHandler() {
		navigation(-1)
	}

	function nextHandler() {
		navigation(1)
	}

	function reloadPageHandler() {
		window.location.reload()
	}

	function newBoardHandler() {
		setIsShow(true)
	}

	function logoutHandler() {
		logout()
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent className="w-64">
				<ContextMenuItem inset onClick={backHandler}>
					Назад
				</ContextMenuItem>
				<ContextMenuItem inset onClick={nextHandler}>
					Вперед
				</ContextMenuItem>
				<ContextMenuItem inset onClick={reloadPageHandler}>
					Перезагрузить
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger inset>Настройки</ContextMenuSubTrigger>
					<ContextMenuSubContent className="w-48">
						<ContextMenuItem onClick={() => navigation(ERoutes.profile)}>
							Профиль
						</ContextMenuItem>
						<ContextMenuItem onClick={() => navigation(ERoutes.account)}>
							Аккаунт
						</ContextMenuItem>
						<ContextMenuItem onClick={() => navigation(ERoutes.display)}>
							Интерфейс
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuItem inset onClick={newBoardHandler}>
					Новая доска
				</ContextMenuItem>
				<ContextMenuItem inset onClick={logoutHandler} className="text-red-400">
					Выйти
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
