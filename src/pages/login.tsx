// Types
import type { FC } from 'react'

// Components
import { AuthPageWrapper, UserLoginForm } from '@/components'
import { ERoutes } from '@/config/routes'
import { useTranslation } from 'react-i18next'

/** Component for user authorization. */
export const Login: FC = () => {
	const { t } = useTranslation()

	return (
		<AuthPageWrapper
			linkRoute={ERoutes.registration}
			linkChildren={t('create')}
			title={t('log_in_to_taskflow')}
			description={t('enter_your_account_information_below')}
		>
			<UserLoginForm />
		</AuthPageWrapper>
	)
}
