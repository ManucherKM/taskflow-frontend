import { Button, TypographyH1, TypographyP } from '@/components'
import { history } from '@/config/history'
import { ERoutes } from '@/config/routes'
import type { FC } from 'react'

export const AccountConfirm: FC = () => {
	function authClickHandler() {
		history.push(ERoutes.login)
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
