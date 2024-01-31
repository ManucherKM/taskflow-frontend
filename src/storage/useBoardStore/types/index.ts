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

export type IUpdateBoard = Partial<
	Omit<IBoard, '_id' | 'createdAt' | 'updatedAt'>
>

export interface IBoardStore {
	boards: IBoard[]

	setBoards: (target: IBoard[]) => void

	getAllBoards: (target?: { deep: boolean }) => Promise<IBoard[] | undefined>

	getAllByName: (target: { name: string }) => Promise<IBoard[] | undefined>

	create: (target: { name: string }) => Promise<IBoard | undefined>

	update: (id: string, target: IUpdateBoard) => Promise<boolean>

	remove: (id: string) => Promise<boolean>
}

export enum EBoardStoreApiRoutes {
	all = '/api/board/all',
	name = '/api/board/name',
	main = '/api/board',
}
