import { IBoard } from '@/storage/useBoardStore/types'

export interface IUpdateBoardStore {
	board: IBoard | null

	isShow: boolean

	setIsShow: (target: boolean) => void

	setBoard: (board: IBoard | null) => void
}
