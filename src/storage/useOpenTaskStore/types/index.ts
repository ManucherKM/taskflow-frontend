import { ITask } from '@/storage/useTaskStore/types'

export interface IOpenTaskStore {
	isShow: boolean

	task: ITask | null

	setTask: (task: ITask) => void

	setIsShow: (target: boolean) => void
}
