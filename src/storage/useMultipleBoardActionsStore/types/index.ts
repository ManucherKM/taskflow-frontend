import { IBoard } from '@/storage/useBoardStore/types'

/** Shared storage. */
export interface IMultipleBoardActionsStore {
	isShow: boolean

	setIsShow: (isShow: boolean) => void

	selectedBoards: IBoard[]

	setSelectedBoards: (target: IBoard[]) => void

	remove: (target: IBoard[]) => Promise<boolean>
}

export enum EMultipleBoardActionsStoreApiRoutes {
	remove = '/api/board',
}
