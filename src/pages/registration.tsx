import type { FC } from 'react'

import { AuthPageWrapper, UserRegistrationForm } from '@/components'
import { ERoutes } from '@/config/routes'
import { useTranslation } from 'react-i18next'

/** Component for user registration */
export const Registration: FC = () => {
	const { t } = useTranslation()

	return (
		<AuthPageWrapper
			linkRoute={ERoutes.login}
			linkChildren={t('sign_in')}
			title={t('create_an_account')}
			description={t('enter_your_account_information_below')}
		>
			<UserRegistrationForm />
		</AuthPageWrapper>
	)
}
