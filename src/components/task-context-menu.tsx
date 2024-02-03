import type { FC, ReactNode } from 'react'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from './ui/context-menu'

export interface ITaskContextMenu {
	children: ReactNode
}

export const TaskContextMenu: FC<ITaskContextMenu> = ({ children }) => {
	function openHandler() {}

	function duplicationHandler() {}

	function updateHandler() {}

	function removeHandler() {}

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={openHandler}>Открыть</ContextMenuItem>
				<ContextMenuItem onClick={duplicationHandler}>
					Дублировать
				</ContextMenuItem>
				<ContextMenuItem onClick={updateHandler}>Изменить</ContextMenuItem>
				<ContextMenuItem className="text-red-400" onClick={removeHandler}>
					Удалить
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
