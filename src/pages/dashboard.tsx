// Types
import { IDeepBoard } from '@/storage/useBoardStore/types'
import type { FC } from 'react'

// Components
import {
	Button,
	CustomTooltip,
	Icons,
	NavBar,
	ScrollArea,
	ScrollBar,
	StageBoardList,
	toast,
} from '@/components'

// Storage
import {
	useBoardStore,
	useCreateStageStore,
	useInviteUserToBoardStore,
} from '@/storage'

// Utils
import { ERoutes } from '@/config/routes'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

/**
 * Component for work with board
 *
 * @returns
 */
export const Dashboard: FC = () => {
	// Get the board identifier from the URL parameters.
	const { id } = useParams()

	// Function for changing the active board.
	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	// Value for an active board.
	const activeBoard = useBoardStore(store => store.activeBoard) as IDeepBoard

	// Get the function to redirect the user from the hook.
	const navigate = useNavigate()

	// Function to get complete board data, including milestones and tasks.
	const getDeepBoard = useBoardStore(store => store.getDeepBoard)

	// Function to change the modal window display for user invitation.
	const setIsShowInviteUser = useInviteUserToBoardStore(
		store => store.setIsShow,
	)

	// Function to change the board for the modal window for user invitation
	const setBoardInviteUser = useInviteUserToBoardStore(store => store.setBoard)

	// Function to change the display state of a modal window with the creation of a stage.
	const setIsShowCreateStage = useCreateStageStore(store => store.setIsShow)

	// Function to change the board ID for a modal window with board creation.
	const setCreateStageBoardId = useCreateStageStore(store => store.setBoardId)

	// Handler function for creating a stage
	function createStageHandler() {
		// If no identifier is found, terminate the function.
		if (!id) return

		//Passing the board ID to the repository to create the stage.
		setCreateStageBoardId(id)

		// Show the user a modal window with the creation of the stage.
		setIsShowCreateStage(true)
	}

	// Function handler for inviting the user.
	function inviteUserHandler() {
		// Modify the board in the repository to invite the user.
		setBoardInviteUser(activeBoard)

		// Show the user a modal window to invite the user.
		setIsShowInviteUser(true)
	}

	// An effect that will work once when rendering a component.
	useEffect(() => {
		// If no identifier is found.
		if (!id) {
			// Redirect the user to the home page.
			navigate(ERoutes.home)

			// Finishing the function.
			return
		}

		// Function to retrieve full board data.
		const fetchBoard = async () => {
			try {
				// We get the board.
				const board = await getDeepBoard(id)

				// If the board is not found.
				if (!board) {
					// Showing the user a notification.
					toast({
						title: 'Не удалось получить доску',
						description: 'Возможно данной доски не существует',
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

		// Temporary solution.
		// setInterval(() => {
		// 	fetchBoard()
		// }, 5000)

		// Call the function to get the full board data.
		fetchBoard()
	}, [])
	return (
		<>
			<NavBar>
				<CustomTooltip text="Пригласить в доску">
					<Button variant={'ghost'} size={'icon'} onClick={inviteUserHandler}>
						<Icons.userPlus />
					</Button>
				</CustomTooltip>
			</NavBar>

			<div className="container mt-5">
				<ScrollArea className="w-full h-[calc(100vh-93px)]">
					<div className="flex w-max space-x-4 p-4">
						{!!activeBoard && (
							<StageBoardList
								boardId={activeBoard._id}
								stages={activeBoard.stages}
							/>
						)}
						<Button
							variant={'ghost'}
							className="flex gap-2 w-[300px]"
							onClick={createStageHandler}
						>
							<Icons.plus />
							Создать новый этап
						</Button>
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</>
	)
}
