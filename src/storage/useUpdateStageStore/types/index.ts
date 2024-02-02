import { IStage } from '@/storage/useBoardStore/types'
import { ICreateTarget } from '@/storage/useCreateStageStore/types'

export interface IUpdateTarget extends ICreateTarget {}

export interface IUpdateStageStore {
	isShow: boolean

	stageId: string | null

	setIsShow: (target: boolean) => void

	setStageId: (target: string) => void

	update: (target: IUpdateTarget) => Promise<IStage | undefined>
}

export enum EUpdateStageStoreApiRoutes {
	update = '/api/stage',
}
