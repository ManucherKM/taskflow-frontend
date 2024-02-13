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
} from '@/components'

// Storage
import {
	useBoardMembersStore,
	useBoardStore,
	useCreateStageStore,
	useInviteUserToBoardStore,
} from '@/storage'

// Utils
import { ERoutes } from '@/config/routes'
import { useFetchBoard } from '@/hooks'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

/**
 * Component for work with board
 *
 * @returns
 */
export const Dashboard: FC = () => {
	// Get the board identifier from the URL parameters.
	const { id } = useParams()

	const { t } = useTranslation()

	const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

	// Function for changing the active board.
	const setActiveBoard = useBoardStore(store => store.setActiveBoard)

	// Value for an active board.
	const activeBoard = useBoardStore(store => store.activeBoard)

	const setIsShowBoardMembers = useBoardMembersStore(store => store.setIsShow)

	const setBoardBoardMembers = useBoardMembersStore(store => store.setBoard)

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

	const fetchBoard = useFetchBoard()

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
		setBoardInviteUser(activeBoard as IDeepBoard)

		// Show the user a modal window to invite the user.
		setIsShowInviteUser(true)
	}

	function boardMembersHandler() {
		if (!activeBoard) {
			return
		}

		setIsShowBoardMembers(true)
		setBoardBoardMembers(activeBoard)
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

		// Call the function to get the full board data.
		fetchBoard(id)
	}, [])

	useEffect(() => {
		if (!id) {
			return
		}

		// Temporary solution.
		if (intervalIdRef.current) {
			clearTimeout(intervalIdRef.current)
			intervalIdRef.current = setInterval(() => {
				fetchBoard(id)
			}, 5000)
		} else {
			intervalIdRef.current = setInterval(() => {
				fetchBoard(id)
			}, 5000)
		}

		return () => {
			if (intervalIdRef.current) {
				clearTimeout(intervalIdRef.current)
			}
		}
	}, [intervalIdRef])

	if (!activeBoard) {
		return <></>
	}

	return (
		<>
			<NavBar>
				<Button variant={'ghost'} size={'icon'} onClick={boardMembersHandler}>
					<Icons.users />
				</Button>
				<CustomTooltip text={t('invite_to_the_board')}>
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
							{t('create_a_new_stage')}
						</Button>
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</>
	)
}
