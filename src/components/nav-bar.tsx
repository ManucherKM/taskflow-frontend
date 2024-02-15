import { ERoutes } from '@/config/routes'
import { useOutsideClick } from '@/hooks'
import { useCraeteBoardStore, useLogoutStore, useUserStore } from '@/storage'
import clsx from 'clsx'
import { ReactNode, useEffect, useRef, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Icons, MobileView, NavbarContextMenu, SearchBoard } from '.'
import { CustomTooltip } from './custom-tooltip'
import { DesktopView } from './desktop-view'
import { Logo } from './logo'
import { Search } from './search'
import { TypographyP } from './typography-p'
import { Avatar, AvatarFallback } from './ui/avatar'

export interface INavBar {
	children?: ReactNode
}

export const NavBar: FC<INavBar> = ({ children }) => {
	const { t } = useTranslation()
	const containerMenuRef = useRef<HTMLDivElement | null>(null)
	const isOutsideBurger = !useOutsideClick(containerMenuRef)

	const navigation = useNavigate()

	const [searchQuery, setSearchQuery] = useState<string>('')
	const [isShowSearchBoard, setIsShowSearchBoard] = useState<boolean>(false)
	const searchBoardRef = useRef<HTMLDivElement | null>(null)
	const isClickNodeContain = useOutsideClick(searchBoardRef)
	const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
	const setIsShowCreateBoard = useCraeteBoardStore(store => store.setIsShow)
	const setIsShowLogout = useLogoutStore(store => store.setIsShow)

	const user = useUserStore(store => store.user)

	function newBoardHandler() {
		setIsShowCreateBoard(true)
	}

	function logoutHandler() {
		setIsShowLogout(true)
	}

	useEffect(() => {
		if (!isClickNodeContain) {
			setIsShowSearchBoard(false)
		}
	}, [isClickNodeContain])

	useEffect(() => {
		setIsShowMenu(false)
	}, [isOutsideBurger])

	return (
		<>
			<DesktopView>
				<nav className="border-b">
					<div className="container">
						<div className="py-4 flex justify-between items-center">
							<CustomTooltip text={t('home')}>
								<Link to={ERoutes.home} className="hover:opacity-80">
									<Logo />
								</Link>
							</CustomTooltip>

							<div className="flex gap-2 items-center">
								{children}
								<SearchBoard
									ref={searchBoardRef}
									className="w-96"
									searchComponent={
										<Search
											type="text"
											placeholder={t('find_the_board')}
											onChange={e => setSearchQuery(e.target.value)}
											onFocus={() => setIsShowSearchBoard(true)}
										/>
									}
									query={searchQuery}
									isShow={isShowSearchBoard && !!isClickNodeContain}
								/>

								<TypographyP className="w-24 overflow-hidden text-ellipsis !mt-0 ml-2">
									{user?.email}
								</TypographyP>
								<NavbarContextMenu>
									<Avatar className="cursor-pointer hover:opacity-80">
										{/* <AvatarImage src={user?.avatar} /> */}
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</NavbarContextMenu>
							</div>
						</div>
					</div>
				</nav>
			</DesktopView>

			<MobileView>
				<nav>
					<div
						ref={containerMenuRef}
						className={clsx([
							'container relative px-[1rem]',
							!isShowMenu && 'border-b',
						])}
					>
						<div className="py-4 flex justify-between items-center">
							<CustomTooltip text={t('home')}>
								<Link to={ERoutes.home} className="hover:opacity-80">
									<Logo />
								</Link>
							</CustomTooltip>

							<div className="flex gap-2">
								<Button
									variant={'ghost'}
									size={'icon'}
									onClick={() => setIsShowMenu(prev => !prev)}
								>
									<Icons.burger />
								</Button>
							</div>
						</div>
						{isShowMenu && (
							<div className="absolute z-50 left-0 p-4 flex flex-col gap-4 border-b bg-background w-full">
								<SearchBoard
									ref={searchBoardRef}
									className="w-full"
									searchComponent={
										<Search
											type="text"
											placeholder={t('find_the_board')}
											onChange={e => setSearchQuery(e.target.value)}
											onFocus={() => setIsShowSearchBoard(true)}
										/>
									}
									query={searchQuery}
									isShow={isShowSearchBoard && !!isClickNodeContain}
								/>

								<Button
									onClick={() => navigation(ERoutes.profile)}
									variant={'outline'}
								>
									{t('profile')}
								</Button>
								<Button
									onClick={() => navigation(ERoutes.account)}
									variant={'outline'}
								>
									{t('account')}
								</Button>
								<Button
									onClick={() => navigation(ERoutes.display)}
									variant={'outline'}
								>
									{t('interface')}
								</Button>

								<div className="flex gap-2 flex-wrap justify-center">
									<Button
										variant={'ghost'}
										size={'icon'}
										onClick={() => newBoardHandler()}
									>
										<Icons.plus />
									</Button>
									{children}
									<Button
										variant={'ghost'}
										size={'icon'}
										onClick={() => logoutHandler()}
									>
										<Icons.logout />
									</Button>
								</div>
							</div>
						)}
					</div>
				</nav>
			</MobileView>
		</>
	)
}
