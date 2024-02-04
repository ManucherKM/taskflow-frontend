export interface ITask {
	_id: string
	description: string
	title: string
}

export interface IUpdateTaskTarget extends Partial<Omit<ITask, '_id'>> {}

export interface ITaskStore {
	duplication: (id: string, stageId: string) => Promise<ITask | boolean>

	update: (id: string, target: IUpdateTaskTarget) => Promise<boolean>

	remove: (id: string) => Promise<boolean>
}

export enum ETaskStoreApiRoutes {
	main = '/api/task',
	duplicate = '/api/task/duplicate',
}
