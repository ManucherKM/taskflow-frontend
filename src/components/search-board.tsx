import {
	ComponentPropsWithoutRef,
	ReactNode,
	forwardRef,
	useEffect,
	useState,
} from 'react'

import { Root } from '@radix-ui/react-scroll-area'

import { ERoutes } from '@/config/routes'
import { useDelayForType } from '@/hooks'
import { useBoardStore } from '@/storage'
import { IBoard } from '@/storage/useBoardStore/types'
import { formatDateDDMMYYYY, getAvatarFallback } from '@/utils'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { TypographyP, toast } from '.'
import { Icons } from './icons'
import { Avatar, AvatarFallback } from './ui/avatar'
import { ScrollArea } from './ui/scroll-area'

export interface ISearchBoard extends ComponentPropsWithoutRef<typeof Root> {
	query: string
	searchComponent: ReactNode
	isShow: boolean
}

export const SearchBoard = forwardRef<HTMLDivElement, ISearchBoard>(
	({ query, searchComponent, isShow, className, ...props }, ref) => {
		const { t } = useTranslation()

		const delayForType = useDelayForType()

		const [isLoading, setIsLoading] = useState<boolean>(false)

		const findBoards = useBoardStore(store => store.getAllByName)

		const [boards, setBoards] = useState<IBoard[]>([])

		const fetchBoards = async () => {
			try {
				const boards = await findBoards(query)

				if (typeof boards === 'undefined') {
					toast({
						title: t('failed_to_find_a_workspace'),
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
					<ScrollArea
						className={clsx([
							'!absolute top-10 h-72 rounded-md border bg-background z-50',
							className,
						])}
						{...props}
					>
						{isLoading && (
							<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-accent/75 z-20">
								<Icons.spinner className="animate-spin" />
							</div>
						)}

						{boards.map(board => (
							<Link
								key={board._id}
								to={ERoutes.dashboard + '/' + board._id}
								className="flex flex-col"
							>
								<div
									key={board._id}
									className="flex space-x-4 cursor-pointer hover:bg-accent p-3 rounded-sm"
								>
									<Avatar>
										{/* <AvatarImage src="https://github.com/vercel.png" /> */}
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
												{t('created')}{' '}
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
							<div className="w-full h-[280px] flex flex-col justify-center items-center">
								<Icons.zoomCancel className="w-10 h-10" />
								<TypographyP className="!mt-0">
									{t('no_matches_found')}
								</TypographyP>
							</div>
						)}
					</ScrollArea>
				)}
			</div>
		)
	},
)
