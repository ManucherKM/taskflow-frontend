import { ReactNode, forwardRef, useEffect, useState } from 'react'

import { ERoutes } from '@/config/routes'
import { useDelayForType } from '@/hooks'
import { useBoardStore } from '@/storage'
import { IBoard } from '@/storage/useBoardStore/types'
import { formatDateDDMMYYYY, getAvatarFallback } from '@/utils'
import { Link } from 'react-router-dom'
import { TypographyP, toast } from '.'
import { Icons } from './icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ScrollArea } from './ui/scroll-area'

export interface ISearchBoard {
	query: string
	searchComponent: ReactNode
	isShow: boolean
}

export const SearchBoard = forwardRef<HTMLDivElement, ISearchBoard>(
	({ query, searchComponent, isShow }, ref) => {
		const delayForType = useDelayForType()

		const [isLoading, setIsLoading] = useState<boolean>(false)

		const findBoards = useBoardStore(store => store.getAllByName)

		const [boards, setBoards] = useState<IBoard[]>([])

		const fetchBoards = async () => {
			try {
				const boards = await findBoards({ name: query })

				if (typeof boards === 'undefined') {
					toast({
						title: 'Не удалось найти рабочее пространство',
					})
					return
				}

				setBoards(boards)
			} catch (e) {
				console.error(e)
			}
		}

		useEffect(() => {
			if (!query) return

			setIsLoading(true)

			delayForType(() => {
				fetchBoards().finally(() => setIsLoading(false))
			})
		}, [query])
		return (
			<div ref={ref} className="relative">
				{searchComponent}
				{query.length !== 0 && isShow && (
					<ScrollArea className="!absolute top-10 h-72 rounded-md border w-96 bg-background z-50">
						{isLoading && (
							<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
								<Icons.spinner className="animate-spin" />
							</div>
						)}

						{boards.map(board => (
							<Link
								key={board._id}
								to={ERoutes.board + '/' + board._id}
								className="flex flex-col"
							>
								<div
									key={board._id}
									className="flex space-x-4 cursor-pointer hover:bg-accent p-3 rounded-sm"
								>
									<Avatar>
										<AvatarImage src="https://github.com/vercel.png" />
										<AvatarFallback>
											{getAvatarFallback(board.name)}
										</AvatarFallback>
									</Avatar>
									<div className="space-y-1 overflow-hidden ">
										<p className="text-sm text-ellipsis overflow-hidden  text-nowrap">
											{board.name}
										</p>
										<div className="flex items-center pt-2">
											<span className="text-xs text-muted-foreground">
												Создан{' '}
												{formatDateDDMMYYYY(new Date(board.createdAt)).join(
													'.',
												)}
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}

						{boards.length === 0 && !isLoading && (
							<div className="w-full h-[280px] flex justify-center items-center">
								<TypographyP>
									Похоже что у вас нет доски с таким именем
								</TypographyP>
							</div>
						)}
					</ScrollArea>
				)}
			</div>
		)
	},
)
