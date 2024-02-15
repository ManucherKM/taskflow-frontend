// Types
import axios from '@/config/axios'
import { ECreateTaskStoreApiRoutes, type ICreateTaskStore } from './types'

// Utils
import { create } from 'zustand'
import { ITask } from '../useTaskStore/types'

const defaultStore = {
	isShow: false,
	stageId: null,
} as ICreateTaskStore

export const useCreateTaskStore = create<ICreateTaskStore>((set, get) => ({
	...defaultStore,
	setIsShow(isShow) {
		set({ isShow })
	},
	setStageId(stageId) {
		set({ stageId })
	},
	async create(target) {
		try {
			const stageId = get().stageId

			if (!stageId) return

			const { data } = await axios.post<ITask>(
				ECreateTaskStoreApiRoutes.create,
				target,
			)

			if (!data) {
				return
			}

			return data
		} catch (e) {
			console.error(e)
		}
	},
}))
