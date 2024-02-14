import { ERoutes } from '@/config/routes'
import { useOutsideClick } from '@/hooks'
import { useCraeteBoardStore, useUserStore } from '@/storage'
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

	const user = useUserStore(store => store.user)

	function newBoardHandler() {
		setIsShowCreateBoard(true)
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
						className={clsx(['container relative', !isShowMenu && 'border-b'])}
					>
						<div className="py-4 flex justify-between items-center">
							<CustomTooltip text={t('home')}>
								<Link to={ERoutes.home} className="hover:opacity-80">
									<Logo />
								</Link>
							</CustomTooltip>

							<Button
								variant={'ghost'}
								size={'icon'}
								onClick={() => setIsShowMenu(prev => !prev)}
							>
								<Icons.burger />
							</Button>
						</div>
						{isShowMenu && (
							<div className="absolute z-50 left-0 p-4 flex flex-col gap-6 border-b bg-background w-full">
								<Button
									onClick={() => navigation(ERoutes.profile)}
									variant={'link'}
									className="mr-auto p-0 h-auto"
								>
									{t('profile')}
								</Button>
								<Button
									onClick={() => navigation(ERoutes.account)}
									variant={'link'}
									className="mr-auto p-0 h-auto"
								>
									{t('account')}
								</Button>
								<Button
									onClick={() => navigation(ERoutes.display)}
									variant={'link'}
									className="mr-auto p-0 h-auto"
								>
									{t('interface')}
								</Button>
								<Button
									onClick={() => newBoardHandler()}
									variant={'link'}
									className="mr-auto p-0 h-auto"
								>
									{t('new_board')}
								</Button>

								{children}
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
							</div>
						)}
					</div>
				</nav>
			</MobileView>
		</>
	)
}
