import { FC, ReactNode, useEffect, useState } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useBoardMembersStore, useBoardStore, useUserStore } from '@/storage'
import { IUser } from '@/storage/useUserStore/types'
import { Button, ScrollArea, toast } from '.'

import { useLoader } from '@/hooks'
import { cn } from '@/lib/utils'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { getAvatarFallback } from '@/utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import {
	Avatar,
	AvatarFallback,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Icons,
	List,
} from '.'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface IBoardMembersProvider {
	children: ReactNode
}

export const BoardMembersProvider: FC<IBoardMembersProvider> = ({
	children,
}) => {
	const { t } = useTranslation()

	const isShow = useBoardMembersStore(store => store.isShow)
	const setIsShow = useBoardMembersStore(store => store.setIsShow)
	const board = useBoardMembersStore(store => store.board)
	const setBoardMemebers = useBoardMembersStore(store => store.setBoard)
	const user = useUserStore(store => store.user)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)

	const setActiveBoard = useBoardStore(store => store.setActiveBoard)
	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	const getBoardUsers = useBoardStore(store => store.getBoardUsers)
	const removeAdmin = useBoardStore(store => store.removeAdmin)
	const addAdmin = useBoardStore(store => store.addAdmin)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [users, setUsers] = useState<IUser[]>([])

	const loader = useLoader()

	async function removeAdminHandler(removeId: string) {
		if (!board) {
			return
		}

		try {
			const savedBoard = await loader(removeAdmin, removeId, board._id)

			if (!savedBoard) {
				toast({
					title: t('failed_to_change_roles'),
				})

				return
			}

			const newBoard = { ...activeBoard, admins: savedBoard.admins }

			setActiveBoard(newBoard)
			setBoardMemebers(newBoard)

			toast({
				title: t('role_successfully_changed'),
			})
		} catch (e) {
			console.log(e)
		}
	}

	async function addAdminHandler(addId: string) {
		if (!board) {
			return
		}

		try {
			const savedBoard = await loader(addAdmin, addId, board._id)

			if (!savedBoard) {
				toast({
					title: t('failed_to_change_roles'),
				})

				return
			}

			const newBoard = { ...activeBoard, admins: savedBoard.admins }

			setActiveBoard(newBoard)
			setBoardMemebers(newBoard)

			toast({
				title: t('role_successfully_changed'),
			})
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (!board) return

		const fetchUsers = async () => {
			try {
				setIsLoading(true)

				const foundUsers = await getBoardUsers(board._id)

				if (typeof foundUsers === 'undefined') {
					toast({
						title: t('failed_to_retrieve_the_list_of_board_members'),
					})

					return
				}

				setUsers(foundUsers)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUsers()
	}, [board])

	useEffect(() => {
		if (!board || !user) return

		const foundUser = board.admins.includes(user._id)

		setIsAdmin(!!foundUser)
	}, [board])

	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{t('board_members')}</DialogTitle>
						<DialogDescription className="!mt-5">
							{t('invite_other_users_to_collaborate')}
						</DialogDescription>
					</DialogHeader>
					<ScrollArea
						className={cn([
							'w-full relative my-4',
							users.length >= 4 && 'h-52',
						])}
					>
						<div className="flex flex-col gap-6 w-full">
							{isLoading && (
								<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  z-20">
									<Icons.spinner className="animate-spin" />
								</div>
							)}
							{users.length !== 0 && (
								<List
									arr={users}
									callback={currUser => (
										<div
											key={currUser._id}
											className="flex items-center justify-between space-x-4 h-max"
										>
											<div className="flex items-center space-x-4 w-full">
												<Avatar className="h-10 w-10">
													<AvatarFallback>
														{getAvatarFallback(currUser.firstName || 'NF')}
													</AvatarFallback>
												</Avatar>
												<div className="w-full">
													<div className="flex justify-between items-center">
														<p className="text-sm font-medium leading-none">
															{!!currUser?.firstName || currUser?.lastName
																? currUser.firstName + ' ' + currUser.lastName
																: currUser.userName}
														</p>
														{!!board?.admins.includes(currUser._id) && (
															<span className="text-sm text-muted-foreground underline">
																admin
															</span>
														)}
													</div>
													<p className="text-sm text-muted-foreground">
														{currUser.email}
													</p>
												</div>
											</div>
											{user && isAdmin && user._id !== currUser._id && (
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															size="sm"
															className="ml-auto"
														>
															{!!board?.admins.includes(currUser._id)
																? t('admin')
																: t('member')}
															<ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
														</Button>
													</PopoverTrigger>
													<PopoverContent className="p-0" align="end">
														<Command>
															<CommandInput
																placeholder={t('select_a_new_role') + '...'}
															/>
															<CommandList>
																<CommandEmpty>
																	{t('role_not_found')}
																</CommandEmpty>
																<CommandGroup>
																	<CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
																		<div
																			onClick={() =>
																				addAdminHandler(currUser._id)
																			}
																		>
																			<p>{t('admin')}</p>
																			<p className="text-sm text-muted-foreground">
																				{t('has_full_control_of_the_board')}
																			</p>
																		</div>
																	</CommandItem>
																	<CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
																		<div
																			onClick={() =>
																				removeAdminHandler(currUser._id)
																			}
																		>
																			<p>{t('member')}</p>
																			<p className="text-sm text-muted-foreground">
																				{t(
																					'can_interact_with_the_board_in_a_limited_way',
																				)}
																			</p>
																		</div>
																	</CommandItem>
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>
											)}
										</div>
									)}
								/>
							)}
						</div>
					</ScrollArea>

					<DialogFooter>
						<Button
							type="button"
							className="mr-auto"
							onClick={() => setIsShow(false)}
							autoFocus
						>
							{t('close')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{children}
		</>
	)
}
