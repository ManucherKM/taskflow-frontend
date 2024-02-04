import { ITask } from '@/storage/useTaskStore/types'

export interface IStage {
	_id: string
	name: string
	tasks: ITask[]
}

export interface IUpdateStageTarget
	extends Partial<Omit<IStage, '_id' | 'tasks'>> {
	tasks: string[]
}

export interface IStageStore {
	duplication: (id: string) => Promise<IStage | boolean>

	update: (
		id: IStage,
		target: IUpdateStageTarget,
	) => Promise<IStage | undefined>

	remove: (id: string) => Promise<boolean>
}

export enum EStageStoreApiRoutes {
	main = '/api/stage',
	duplicate = '/api/stage/duplicate',
}
