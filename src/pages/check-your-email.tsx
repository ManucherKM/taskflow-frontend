import { Button, TypographyH1, TypographyP } from '@/components'
import { history } from '@/config/history'
import { ERoutes } from '@/config/routes'
import type { FC } from 'react'

export const CheckYourEmail: FC = () => {
	function clickHandler() {
		history.push(ERoutes.login)
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
