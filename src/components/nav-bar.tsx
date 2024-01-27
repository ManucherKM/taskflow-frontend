import { ERoutes } from '@/config/routes'
import { useAuthStore } from '@/storage'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from './icons'
import { Logo } from './logo'
import { Search } from './search'
import { useTheme } from './theme-provider'
import { TypographyP } from './typography-p'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

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
						<Search type="text" placeholder="Найти доску" />
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
								<Icons.moon className="block dark:hidden" />
								<Icons.sun className="hidden dark:block" />
							</Button>
							<Button variant={'ghost'} size={'icon'} onClick={logout}>
								<Icons.logout />
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
