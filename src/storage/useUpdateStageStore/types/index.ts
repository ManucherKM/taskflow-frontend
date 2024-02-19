import { ICreateTarget } from '@/storage/useCreateStageStore/types'
import { IStage } from '@/storage/useStageStore/types'

export interface IUpdateTarget extends ICreateTarget {}

export interface IUpdateStageStore {
	isShow: boolean

	stage: IStage | null

	setIsShow: (target: boolean) => void

	setStage: (stage: IStage | null) => void

	update: (target: IUpdateTarget) => Promise<IStage | undefined>
}

export enum EUpdateStageStoreApiRoutes {
	update = '/api/stage',
}
