import { FC, ReactNode, useEffect, useState } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useBoardMembersStore, useBoardStore } from '@/storage'
import { IUser } from '@/storage/useUserStore/types'
import { Button, toast } from '.'

import { getAvatarFallback } from '@/utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'
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
	const isShow = useBoardMembersStore(store => store.isShow)
	const setIsShow = useBoardMembersStore(store => store.setIsShow)
	const board = useBoardMembersStore(store => store.board)

	const getBoardUsers = useBoardStore(store => store.getBoardUsers)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		if (!board) {
			return
		}

		const fetchUsers = async () => {
			try {
				setIsLoading(true)

				const foundUsers = await getBoardUsers(board._id)

				if (typeof foundUsers === 'undefined') {
					toast({
						title: 'Не удалось получить список участников доски',
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

	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Участники доски</DialogTitle>
						<DialogDescription className="!mt-5">
							Приглашайте других пользователей для совместной работы.
						</DialogDescription>
					</DialogHeader>
					<div className="relative">
						{isLoading && (
							<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  z-20">
								<Icons.spinner className="animate-spin" />
							</div>
						)}
						{users.length !== 0 && (
							<List
								arr={users}
								callback={user => (
									<div
										key={user._id}
										className="flex items-center justify-between space-x-4"
									>
										<div className="flex items-center space-x-4">
											<Avatar className="h-10 w-10">
												<AvatarFallback>
													{getAvatarFallback(user.firstName || 'NF')}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium leading-none">
													{!!user?.firstName || user?.lastName
														? user.firstName + ' ' + user.lastName
														: user.userName}
												</p>
												<p className="text-sm text-muted-foreground">
													{user.email}
												</p>
											</div>
										</div>
										<Popover>
											<PopoverTrigger asChild>
												<Button variant="outline" size="sm" className="ml-auto">
													{board?.admins.includes(user._id)
														? 'Админ'
														: 'Участник'}
													<ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="p-0" align="end">
												<Command>
													<CommandInput placeholder="Выберите новую роль..." />
													<CommandList>
														<CommandEmpty>Роль не найдена.</CommandEmpty>
														<CommandGroup>
															<CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
																<p>Админ</p>
																<p className="text-sm text-muted-foreground">
																	Имеет полный контроль над доской
																</p>
															</CommandItem>
															<CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
																<p>Участник</p>
																<p className="text-sm text-muted-foreground">
																	Может в ограниченой форме взаимодейтвовать с
																	доской.
																</p>
															</CommandItem>
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
									</div>
								)}
							/>
						)}
					</div>
					<DialogFooter>
						<Button
							type="button"
							className="mr-auto"
							onClick={() => setIsShow(false)}
							autoFocus
						>
							Закрыть
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{children}
		</>
	)
}
