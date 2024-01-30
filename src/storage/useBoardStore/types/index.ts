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

	getAllBoards: (target?: { deep: boolean }) => Promise<IBoard[] | undefined>

	getAllByName: (target: { name: string }) => Promise<IBoard[] | undefined>

	create: (target: { name: string }) => Promise<IBoard | undefined>

	update: (id: string, target: Partial<Omit<IBoard, '_id'>>) => Promise<boolean>

	remove: (id: string) => Promise<boolean>
}

export enum EBoardStoreApiRoutes {
	all = '/api/board/all',
	name = '/api/board/name',
	main = '/api/board',
}
