import { ITask } from '@/storage/useTaskStore/types'

export interface ICreateTarget {
	stageId: string
	title: string
	description: string
}

export interface ICreateTaskStore {
	isShow: boolean

	stageId: string | null

	setIsShow: (target: boolean) => void

	setStageId: (target: string) => void

	create: (target: ICreateTarget) => Promise<ITask | undefined>
}

export enum ECreateTaskStoreApiRoutes {
	create = '/api/task',
}
