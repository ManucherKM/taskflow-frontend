import { ICreateTarget } from '@/storage/useCreateTaskStore/types'
import { ITask } from '@/storage/useTaskStore/types'

export interface IUpdateTarget extends Partial<ICreateTarget> {}

export interface IUpdateTaskStore {
	isShow: boolean

	taskId: string | null

	setIsShow: (target: boolean) => void

	setTaskId: (target: string) => void

	update: (target: IUpdateTarget) => Promise<ITask | undefined>
}

export enum EUpdateTaskStoreApiRoutes {
	update = '/api/task',
}
