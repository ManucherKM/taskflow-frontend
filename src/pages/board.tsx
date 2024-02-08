import {
	Button,
	Icons,
	NavBar,
	ScrollArea,
	ScrollBar,
	toast,
} from '@/components'
import { CustomTooltip } from '@/components/custom-tooltip'
import { StageBoardList } from '@/components/stage-board-list'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import {
	useBoardStore,
	useCreateStageStore,
	useInviteUserToBoardStore,
} from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { useEffect, type FC } from 'react'
import { useNavigate, useParams } from 'react-router'

export const Board: FC = () => {
	const { id } = useParams()

	const setBoard = useBoardStore(store => store.setActiveBoard)

	const update = useBoardStore(store => store.update)

	const board = useBoardStore(store => store.activeBoard) as IDeepBoard

	const loader = useLoader()

	const navigate = useNavigate()

	const getDeepBoard = useBoardStore(store => store.getDeepBoard)

	const setIsShowInviteUser = useInviteUserToBoardStore(
		store => store.setIsShow,
	)
	const setBoardInviteUser = useInviteUserToBoardStore(store => store.setBoard)

	const setIsShowCreateStage = useCreateStageStore(store => store.setIsShow)

	const setBoardId = useCreateStageStore(store => store.setBoardId)

	function createStageHandler() {
		setBoardId(id as string)
		setIsShowCreateStage(true)
	}

	function inviteUserHandler() {
		setBoardInviteUser(board)
		setIsShowInviteUser(true)
	}

	useEffect(() => {
		if (!id) {
			navigate(ERoutes.home)
			return
		}

		const fetchBoard = async () => {
			try {
				const board = await loader(getDeepBoard, id)

				if (!board) {
					toast({
						title: 'Не удалось получить доску',
						description: 'Возможно данной доски не существует',
					})

					navigate(ERoutes.home)

					return
				}

				setBoard(board)
			} catch (e) {
				console.log(e)
			}
		}

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
			{/* <NavbarDashboard/> */}
			<div className="container mt-5">
				<ScrollArea className="w-full h-[calc(100vh-93px)]">
					<div className="flex w-max space-x-4 p-4">
						{!!board && (
							<StageBoardList boardId={board._id} stages={board.stages} />
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
