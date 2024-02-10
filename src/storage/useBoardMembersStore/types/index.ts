import { IBoard, IDeepBoard } from '@/storage/useBoardStore/types'

export interface IBoardMembersStore {
	isShow: boolean

	board: IBoard | IDeepBoard | null

	setIsShow: (target: boolean) => void

	setBoard: (board: IBoard | IDeepBoard) => void
}
