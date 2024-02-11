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
import { useTranslation } from 'react-i18next'
import { Input, toast } from '.'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

export interface IInviteUserToBoardProvider {
	children: ReactNode
}

export const InviteUserToBoardProvider: FC<IInviteUserToBoardProvider> = ({
	children,
}) => {
	const { t } = useTranslation()

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
					title: t('failed_to_copy_the_link_to_the_clipboard'),
				})
				return
			}

			toast({
				title: t('the_link_has_been_successfully_copied'),
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
						<DialogTitle>
							{t('invite_to_the_board')} {board?.name}
						</DialogTitle>
						<DialogDescription className="!mt-5">
							{t(
								'to_invite_a_user_to_the_board_he_needs_to_authorize_in_our_service_and_then_follow_the_link_below',
							)}
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
							{t('copy')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{children}
		</>
	)
}
