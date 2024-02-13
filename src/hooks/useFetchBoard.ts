import { toast } from '@/components'
import { ERoutes } from '@/config/routes'
import { useBoardStore } from '@/storage'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function useFetchBoard() {
	const { t } = useTranslation()

	// Function to get complete board data, including milestones and tasks.
	const getDeepBoard = useBoardStore(store => store.getDeepBoard)

	// Get the function to redirect the user from the hook.
	const navigate = useNavigate()

	// Function for changing the active board.
	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	return async function (id: string) {
		try {
			// We get the board.
			const board = await getDeepBoard(id)

			// If the board is not found.
			if (!board) {
				// Showing the user a notification.
				toast({
					title: t('failed_to_get_the_board'),
					description: t('maybe_this_board_doesnt_exist'),
				})

				// Redirect the user to the home page.
				navigate(ERoutes.home)

				// Finishing the function.
				return
			}

			// Add the resulting board to the vault.
			setActiveBoard(board)
		} catch (e) {
			// Show the error in the console
			console.log(e)
		}
	}
}
