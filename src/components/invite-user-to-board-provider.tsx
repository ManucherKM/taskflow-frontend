import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { env } from '@/config/env'
import { ERoutes } from '@/config/routes'
import { useInviteUserToBoardStore } from '@/storage'
import { writeTextIntoClipboard } from '@/utils'
import { useEffect, useState, type FC, type ReactNode } from 'react'
import { Input, toast } from '.'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export interface IInviteUserToBoardProvider {
	children: ReactNode
}

export const InviteUserToBoardProvider: FC<IInviteUserToBoardProvider> = ({
	children,
}) => {
	const isShow = useInviteUserToBoardStore(store => store.isShow)
	const setIsShow = useInviteUserToBoardStore(store => store.setIsShow)
	const board = useInviteUserToBoardStore(store => store.board)

	const [link, setLink] = useState<string>(
		CLIENT_URL + ERoutes.inviteUserToBoard + '/' + board?._id,
	)

	async function copyLinkHandler() {
		try {
			const isSuccess = await writeTextIntoClipboard(link)

			if (!isSuccess) {
				toast({
					title: 'Не удалось скопировать ссылку в буффер обмена',
				})
				return
			}

			toast({
				title: 'Ссылка успешно скопирована',
			})
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (!board) {
			return
		}

		setLink(CLIENT_URL + ERoutes.inviteUserToBoard + '/' + board._id)
	}, [board])

	return (
		<>
			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Пригласить в доску {board?.name}</DialogTitle>
						<DialogDescription className="!mt-5">
							Чтобы пригласить пользователя в доску ему необходимо
							авторизоваться в нашем сервисе и затем перейти по ссылке ниже.
						</DialogDescription>
					</DialogHeader>
					<div>
						<Input readOnly value={link} />
					</div>
					<DialogFooter>
						<Button
							type="button"
							className="mr-auto"
							onClick={copyLinkHandler}
							autoFocus
						>
							Скопировать
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
