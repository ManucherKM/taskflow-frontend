import { Button, TypographyH1, TypographyP } from '@/components'
import { ERoutes } from '@/config/routes'
import type { FC } from 'react'
import { useNavigate } from 'react-router'

export const AccountConfirm: FC = () => {
	const navigate = useNavigate()

	function authClickHandler() {
		navigate(ERoutes.login)
	}

	return (
		<div className="container flex flex-col justify-center items-center h-screen">
			<TypographyH1>Поздравляем!</TypographyH1>
			<TypographyP>Учетная запись успешно подтверждена</TypographyP>
			<Button onClick={authClickHandler} className="mt-3">
				Авторизация
			</Button>
		</div>
	)
}
