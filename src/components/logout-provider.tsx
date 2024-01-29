import type { FC, ReactNode } from 'react'

export interface ILogoutProvider {
	children: ReactNode
}

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAuthStore } from '@/storage'

export const LogoutProvider: FC<ILogoutProvider> = ({ children }) => {
	const logout = useAuthStore(store => store.logout)

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Вы уверены что хотите выйти из учетной записи?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Выйдя из учетной записи вы не сможете пользоваться нашим сервисом.
						Чтобы пользоваться нашим сервисом вам нужно будет снова
						авторизоваться.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Отмена</AlertDialogCancel>
					<AlertDialogAction onClick={logout}>Выйти</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
