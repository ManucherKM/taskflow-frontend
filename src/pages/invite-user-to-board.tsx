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
import { useNavigate, useParams } from 'react-router'

/** A component to add a user to an invited board. */
export const InviteUserToBoard: FC = () => {
	// Get the board identifier from the URL parameters.
	const { id } = useParams()

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
					title: 'Не удалось присоединиться к доске',
				})

				// Redirect the user to the home page.
				navigate(ERoutes.home)

				// Finishing the function.
				return
			}

			// Show a notification to the user
			toast({
				title: 'Присоединение к доске прошло успешно',
			})

			// Redirecting the user to a page with a whiteboard.
			navigate(ERoutes.dashboard + '/' + id)
		} catch (e) {
			// Show the error in the console.
			console.log(e)
		}
	}

	// Declare an effect that will be executed at the first rendering of the component.
	useEffect(() => {
		// Call a function to send data to the API.
		submit()
	}, [])

	return (
		<div className="container flex flex-col justify-center items-center h-screen">
			<TypographyH1>Присоединение к доске</TypographyH1>
			<TypographyP className="max-w-md text-center">
				Присоединение к доске может занять какое-то время. Во время этого
				процесса приложение должно быть открыто.
			</TypographyP>
		</div>
	)
}
