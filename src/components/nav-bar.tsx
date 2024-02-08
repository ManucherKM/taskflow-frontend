import { ERoutes } from '@/config/routes'
import { useOutsideClick } from '@/hooks'
import { useUserStore } from '@/storage'
import { ReactNode, useEffect, useRef, useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { NavbarContextMenu, SearchBoard } from '.'
import { CustomTooltip } from './custom-tooltip'
import { Logo } from './logo'
import { Search } from './search'
import { TypographyP } from './typography-p'
import { Avatar, AvatarFallback } from './ui/avatar'

export interface INavBar {
	children?: ReactNode
}

export const NavBar: FC<INavBar> = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [isShowSearchBoard, setIsShowSearchBoard] = useState<boolean>(false)
	const searchBoardRef = useRef<HTMLDivElement | null>(null)
	const [isContain, clickHandler] = useOutsideClick(searchBoardRef)

	const user = useUserStore(store => store.user)

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
			<div className="container border-b">
				<div className="py-4 flex justify-between items-center">
					<CustomTooltip text="На главную">
						<Link to={ERoutes.home} className="hover:opacity-80">
							<Logo />
						</Link>
					</CustomTooltip>

					<div className="flex gap-2 items-center">
						{children}
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
	)
}
