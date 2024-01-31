import { Separator } from '@radix-ui/react-context-menu'
import { FC, ReactNode } from 'react'
import { NavBar } from '.'
import { SidebarNav } from './sidebar-nav'

export interface ILayoutUserSetting {
	children: ReactNode
}

export const LayoutUserSetting: FC<ILayoutUserSetting> = ({ children }) => {
	return (
		<>
			<NavBar />

			<div className="hidden space-y-6 p-10 pb-16 md:block">
				<div className="space-y-0.5">
					<h2 className="text-2xl font-bold tracking-tight">Настройки</h2>
					<p className="text-muted-foreground">
						Управляйте настройками своей учетной записи и устанавливайте
						настройки электронной почты.
					</p>
				</div>
				<Separator className="my-6" />
				<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className="-mx-4 lg:w-1/5">
						<SidebarNav />
					</aside>
					<div className="flex-1 lg:max-w-2xl">{children}</div>
				</div>
			</div>
		</>
	)
}
