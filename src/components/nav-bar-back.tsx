import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Button } from './ui/button'

export const NavBarBack: FC = () => {
	const { t } = useTranslation()

	const navigation = useNavigate()

	function clickHandler() {
		navigation(-1)
	}

	return (
		<nav className="py-2">
			<div className="container">
				<Button onClick={clickHandler} variant={'ghost'}>
					{t('back')}
				</Button>
			</div>
		</nav>
	)
}
