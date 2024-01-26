import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Button } from './ui/button'

export const NavBarBack: FC = () => {
	const navigation = useNavigate()

	function clickHandler() {
		navigation(-1)
	}

	return (
		<nav className="py-2">
			<div className="container">
				<Button onClick={clickHandler} variant={'ghost'}>
					Назад
				</Button>
			</div>
		</nav>
	)
}
