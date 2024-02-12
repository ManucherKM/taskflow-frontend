import { ERoutes } from '@/config/routes'
import { useTranslation } from 'react-i18next'

export function useSidebarNavItems() {
	const { t } = useTranslation()

	return [
		{
			title: t('profile'),
			to: ERoutes.profile,
		},
		{
			title: t('account'),
			to: ERoutes.account,
		},
		{
			title: t('application'),
			to: ERoutes.display,
		},
	]
}
