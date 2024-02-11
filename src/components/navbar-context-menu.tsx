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
import { useCraeteBoardStore, useLogoutStore } from '@/storage'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export interface INavbarContextMenu {
	children: ReactNode
}

export const NavbarContextMenu: FC<INavbarContextMenu> = ({ children }) => {
	const { t } = useTranslation()

	const navigation = useNavigate()
	const setIsShowCreateBoard = useCraeteBoardStore(store => store.setIsShow)
	const setIsShowLogout = useLogoutStore(store => store.setIsShow)

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
		setIsShowCreateBoard(true)
	}

	function logoutHandler() {
		setIsShowLogout(true)
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent className="w-64">
				<ContextMenuItem inset onClick={backHandler}>
					{t('back')}
				</ContextMenuItem>
				<ContextMenuItem inset onClick={nextHandler}>
					{t('forward')}
				</ContextMenuItem>
				<ContextMenuItem inset onClick={reloadPageHandler}>
					{t('reload')}
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger inset>{t('settings')}</ContextMenuSubTrigger>
					<ContextMenuSubContent className="w-48">
						<ContextMenuItem onClick={() => navigation(ERoutes.profile)}>
							{t('profile')}
						</ContextMenuItem>
						<ContextMenuItem onClick={() => navigation(ERoutes.account)}>
							{t('account')}
						</ContextMenuItem>
						<ContextMenuItem onClick={() => navigation(ERoutes.display)}>
							{t('interface')}
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuItem inset onClick={newBoardHandler}>
					{t('new_board')}
				</ContextMenuItem>
				<ContextMenuItem
					inset
					onClick={logoutHandler}
					className="text-red-400 !hover:text-red-600"
				>
					{t('get_out')}
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
