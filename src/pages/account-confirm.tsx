// Types
import type { FC } from 'react'

// Components
import { Button, TypographyH1, TypographyP } from '@/components'

// Utils
import { ERoutes } from '@/config/routes'
import { useNavigate } from 'react-router'

/**
 * A component with the information that the account has been successfully
 * confirmed.
 */
export const AccountConfirm: FC = () => {
	// Get the function to redirect the user from the hook.
	const navigate = useNavigate()

	// Handler function redirects the user to the page with authorization.
	function clickHandler() {
		// Redirect the user to the authorization page.
		navigate(ERoutes.login)
	}

	return (
		<div className="container flex flex-col justify-center items-center h-screen">
			<TypographyH1>Поздравляем!</TypographyH1>
			<TypographyP>Учетная запись успешно подтверждена</TypographyP>
			<Button onClick={clickHandler} className="mt-3">
				Авторизация
			</Button>
		</div>
	)
}
