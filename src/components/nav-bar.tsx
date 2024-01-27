import { ERoutes } from '@/config/routes'
import { useAuthStore } from '@/storage'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icons, Input, Logo, TypographyP, useTheme } from '.'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const NavBar: FC = () => {
	const logout = useAuthStore(store => store.logout)
	const { setTheme, theme } = useTheme()

	return (
		<nav>
			<div className="container">
				<div className="py-4 flex justify-between items-center">
					<Link to={ERoutes.home} className="hover:opacity-80">
						<Logo />
					</Link>

					<div className="flex gap-2 items-center">
						<Input type="text" placeholder="Найти доску" />
						<div className="flex">
							<Button
								variant={'ghost'}
								size={'icon'}
								onClick={() => {
									if (theme === 'dark') {
										setTheme('light')
									} else {
										setTheme('dark')
									}
								}}
							>
								<Icons.sun />
							</Button>
							<Button variant={'ghost'} size={'icon'} onClick={logout}>
								<Icons.exit />
							</Button>
						</div>

						<TypographyP className="w-20 overflow-hidden text-ellipsis !mt-0">
							test@gmail.com
						</TypographyP>
						<Link to={ERoutes.setting}>
							<Avatar className="cursor-pointer hover:opacity-80">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}
