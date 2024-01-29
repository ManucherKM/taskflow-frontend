import { ERoutes } from '@/config/routes'
import { useOutsideClick } from '@/hooks'
import { useEffect, useRef, useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { CreateBoardProvider, NavbarContextMenuProvider, SearchBoard } from '.'
import { Icons } from './icons'
import { Logo } from './logo'
import { LogoutProvider } from './logout-provider'
import { Search } from './search'
import { useTheme } from './theme-provider'
import { TypographyP } from './typography-p'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export const NavBar: FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [isShowSearchBoard, setIsShowSearchBoard] = useState<boolean>(false)
	const searchBoardRef = useRef<HTMLDivElement | null>(null)
	const [isContain, clickHandler] = useOutsideClick(searchBoardRef)

	const { setTheme, theme } = useTheme()

	useEffect(() => {
		if (!isShowSearchBoard) return

		window.addEventListener('click', clickHandler)

		return () => {
			window.removeEventListener('click', clickHandler)
		}
	}, [isShowSearchBoard])

	useEffect(() => {
		if (!isContain) {
			setIsShowSearchBoard(false)
		}
	}, [isContain])

	return (
		<nav>
			<div className="container">
				<div className="py-4 flex justify-between items-center">
					<Link to={ERoutes.home} className="hover:opacity-80">
						<Logo />
					</Link>

					<div className="flex gap-2 items-center">
						<SearchBoard
							ref={searchBoardRef}
							searchComponent={
								<Search
									type="text"
									placeholder="Найти доску"
									onChange={e => setSearchQuery(e.target.value)}
									onFocus={() => setIsShowSearchBoard(true)}
								/>
							}
							query={searchQuery}
							isShow={isShowSearchBoard && isContain}
						/>
						<div className="flex">
							<CreateBoardProvider>
								<Button variant={'ghost'} size={'icon'}>
									<Icons.plus />
								</Button>
							</CreateBoardProvider>
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
							<LogoutProvider>
								<Button variant={'ghost'} size={'icon'}>
									<Icons.logout />
								</Button>
							</LogoutProvider>
						</div>

						<TypographyP className="w-20 overflow-hidden text-ellipsis !mt-0">
							test@gmail.com
						</TypographyP>
						<NavbarContextMenuProvider>
							<Avatar className="cursor-pointer hover:opacity-80">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</NavbarContextMenuProvider>
					</div>
				</div>
			</div>
		</nav>
	)
}
