// Types
import type { FC } from 'react'

// Components
import { TypographyH1, TypographyP, toast } from '@/components'

// Storage
import { useBoardStore } from '@/storage'

// Utils
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

/** A component to add a user to an invited board. */
export const InviteUserToBoard: FC = () => {
	// Get the board identifier from the URL parameters.
	const { id } = useParams()

	const { t } = useTranslation()

	// Function to add a user to an invited board.
	const inviteToDashboard = useBoardStore(store => store.inviteToDashboard)

	// Get the function to redirect the user from the hook.
	const navigate = useNavigate()

	// Helper function to show the loader during query execution.
	const loader = useLoader()

	// Function to send a request for API invitations.
	async function submit() {
		try {
			// If no identifier is found, terminate the function.
			if (!id) return

			// Getting an updated board from API.
			const updatedBoard = await loader(inviteToDashboard, id)

			// If the board is not found.
			if (!updatedBoard) {
				// Show a notification to the user
				toast({
					title: t('failed_to_join_the_board'),
				})

				// Redirect the user to the home page.
				navigate(ERoutes.home)

				// Finishing the function.
				return
			}

			// Show a notification to the user
			toast({
				title: t('joining_the_board_was_successful'),
			})

			// Redirecting the user to a page with a whiteboard.
			navigate(ERoutes.dashboard + '/' + id)
		} catch (e) {
			// Show the error in the console.
			console.error(e)
		}
	}

	// Declare an effect that will be executed at the first rendering of the component.
	useEffect(() => {
		// Call a function to send data to the API.
		submit()
	}, [])

	return (
		<div className="container flex flex-col justify-center items-center h-screen">
			<TypographyH1>{t('joining_the_board')}</TypographyH1>
			<TypographyP className="max-w-md text-center">
				{t(
					'joining_the_board_may_take_some_time_during_this_process_the_application_must_be_open',
				)}
			</TypographyP>
		</div>
	)
}
