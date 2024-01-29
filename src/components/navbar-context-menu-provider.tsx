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
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router'

export interface IContextMenuDemo {
	children: ReactNode
}

export const NavbarContextMenuProvider: FC<IContextMenuDemo> = ({
	children,
}) => {
	const navigation = useNavigate()

	function backHandler() {
		navigation(-1)
	}

	function nextHandler() {
		navigation(1)
	}

	function reloadPageHandler() {
		window.location.reload()
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
			</ContextMenuContent>
		</ContextMenu>
	)
}
