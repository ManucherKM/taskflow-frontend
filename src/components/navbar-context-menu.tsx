import { ERoutes } from '@/config/routes'
import { useCraeteBoardStore, useLogoutStore } from '@/storage'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuItem onClick={backHandler}>{t('back')}</DropdownMenuItem>
				<DropdownMenuItem onClick={nextHandler}>
					{t('forward')}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={reloadPageHandler}>
					{t('reload')}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>{t('settings')}</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem onClick={() => navigation(ERoutes.profile)}>
									{t('profile')}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigation(ERoutes.account)}>
									{t('account')}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigation(ERoutes.display)}>
									{t('interface')}
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={newBoardHandler}>
					{t('new_board')}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={logoutHandler}
					className="text-red-400 !hover:text-red-600"
				>
					{t('get_out')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
