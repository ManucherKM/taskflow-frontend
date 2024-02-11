// Types
import type { FC } from 'react'

// Components
import { Button, TypographyH1, TypographyP } from '@/components'

// Utils
import { ERoutes } from '@/config/routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

/** A component that informs the user that they need to confirm their account. */
export const CheckYourEmail: FC = () => {
	const { t } = useTranslation()

	// Get the function to redirect the user from the hook.
	const navigate = useNavigate()

	// Handler function redirects the user to the page with authorization.
	function clickHandler() {
		// Redirect the user to the authorization page.
		navigate(ERoutes.login)
	}

	return (
		<div className="container flex flex-col justify-center items-center h-screen">
			<TypographyH1>{t('check_your_e_mail')}</TypographyH1>
			<TypographyP className="max-w-[500px] w-full text-center">
				{t(
					'to_use_our_service_you_must_confirm_your_account_a_link_to_activate_your_account_was_sent_to_the_e_mail_address_you_specified',
				)}
			</TypographyP>
			<Button onClick={clickHandler} className="mt-3">
				{t('activated')}
			</Button>
		</div>
	)
}
