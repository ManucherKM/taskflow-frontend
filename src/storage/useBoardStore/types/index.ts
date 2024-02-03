import { IStage } from '@/storage/useStageStore/types'

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

export interface ITask {
	_id: string
	description: string
	title: string
}

export interface IDeepBoard extends Omit<IBoard, 'stages'> {
	stages: IStage[]
}

export type IUpdateBoard = Partial<
	Omit<IBoard, '_id' | 'createdAt' | 'updatedAt'>
>

export interface IBoardStore {
	boards: IBoard[]

	activeBoard: IDeepBoard | null

	setActiveBoard: (target: IDeepBoard) => void

	setBoards: (target: IBoard[]) => void

	getAllBoards: () => Promise<IBoard[] | undefined>

	getDeepBoard: (id: string) => Promise<IDeepBoard | undefined>

	getAllByName: (target: { name: string }) => Promise<IBoard[] | undefined>

	create: (target: { name: string }) => Promise<IBoard | undefined>

	update: (id: string, target: IUpdateBoard) => Promise<boolean>

	remove: (id: string) => Promise<boolean>
}

export enum EBoardStoreApiRoutes {
	all = '/api/board/all',
	name = '/api/board/name',
	main = '/api/board',
	deep = '/api/board/id',
}
