export interface IBoard {
	_id: string
	name: string
	isFavorite: boolean
	stages: string[]
	admins: string[]
	users: string[]
	createdAt: string
	updatedAt: string
}

export interface IBoardStore {
	isShow: boolean

	boards: IBoard[]

	setBoards: (target: IBoard[]) => void

	addBoard: (target: IBoard) => void

	setIsShow: (target: boolean) => void

	getAllBoards: (target: { deep: boolean }) => Promise<IBoard[] | undefined>

	getAllByName: (target: { name: string }) => Promise<IBoard[] | undefined>

	create: (target: { name: string }) => Promise<boolean>

	/** Function to reset the storage to its original state. */
	reset: () => void
}

export enum EBoardStoreApiRoutes {
	all = '/api/board/all',
	name = '/api/board/name',
	create = '/api/board',
}
