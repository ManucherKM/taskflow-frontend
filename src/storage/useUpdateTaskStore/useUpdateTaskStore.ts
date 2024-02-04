// Types
import axios from '@/config/axios'
import { EUpdateTaskStoreApiRoutes, type IUpdateTaskStore } from './types'

// Utils
import { create } from 'zustand'
import { ITask } from '../useTaskStore/types'

const defaultStore = {
	isShow: false,
	taskId: null,
} as IUpdateTaskStore

export const useUpdateTaskStore = create<IUpdateTaskStore>((set, get) => ({
	...defaultStore,
	setIsShow(isShow) {
		set({ isShow })
	},
	setTaskId(target) {
		set({ taskId: target })
	},
	async update(target) {
		try {
			const taskId = get().taskId

			if (!taskId) return

			const { data } = await axios.patch<ITask>(
				EUpdateTaskStoreApiRoutes.update + '/' + taskId,
				target,
			)

			if (!data) {
				return
			}

			return data
		} catch (e) {
			console.log(e)
		}
	},
}))
