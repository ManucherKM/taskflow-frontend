import { IDeepBoard } from '@/storage/useBoardStore/types'

export interface IInviteUserToBoardStore {
	isShow: boolean

	setIsShow: (target: boolean) => void

	board: IDeepBoard | null

	setBoard: (board: IDeepBoard) => void
}
