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
} from '@/components/ui/alert-dialog'
import { useAuthStore, useLogoutStore } from '@/storage'
import { useTranslation } from 'react-i18next'

export const LogoutProvider: FC<ILogoutProvider> = ({ children }) => {
	const { t } = useTranslation()

	const isShow = useLogoutStore(store => store.isShow)

	const setIsShow = useLogoutStore(store => store.setIsShow)

	const logout = useAuthStore(store => store.logout)

	return (
		<>
			<AlertDialog open={isShow} onOpenChange={setIsShow}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t('are_you_sure_you_want_to_log_out_of_your_account')}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t(
								'if_you_log_out_of_your_account_you_will_not_be_able_to_use_our_service_to_use_our_service_you_will_need_to_log_in_again',
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t('cancellation')}</AlertDialogCancel>
						<AlertDialogAction onClick={logout}>
							{t('get_out')}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{children}
		</>
	)
}
