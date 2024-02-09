// Types
import type { FC } from 'react'

// Components
import { Button, TypographyH1, TypographyP } from '@/components'

// Utils
import { ERoutes } from '@/config/routes'
import { useNavigate } from 'react-router'

/** A component that informs the user that they need to confirm their account. */
export const CheckYourEmail: FC = () => {
	// Get the function to redirect the user from the hook.
	const navigate = useNavigate()

	// Handler function redirects the user to the page with authorization.
	function clickHandler() {
		// Redirect the user to the authorization page.
		navigate(ERoutes.login)
	}

	return (
		<div className="container flex flex-col justify-center items-center h-screen">
			<TypographyH1>Проверьте свою почту</TypographyH1>
			<TypographyP className="max-w-[500px] w-full text-center">
				Чтобы пользоваться нашим сервисом вы должны подтвердить свою учетную
				запись. На указанную вами почту была отправлена ссылка с активацией
				учетной записи.
			</TypographyP>
			<Button onClick={clickHandler} className="mt-3">
				Активировал
			</Button>
		</div>
	)
}
