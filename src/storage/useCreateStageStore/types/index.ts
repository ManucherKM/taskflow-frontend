import { IStage } from '@/storage/useStageStore/types'

export interface ICreateTarget {
	name: string
}

export interface ICreateStageStore {
	isShow: boolean

	boardId: string | null

	setIsShow: (target: boolean) => void

	setBoardId: (target: string) => void

	create: (target: ICreateTarget) => Promise<IStage | undefined>
}

export enum ECreateStageStoreApiRoutes {
	create = '/api/stage',
}
