// Types
import axios from '@/config/axios'
import { EUpdateTaskStoreApiRoutes, type IUpdateTaskStore } from './types'

// Utils
import { create } from 'zustand'

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

			if (!taskId) return false

			const { data } = await axios.patch<{ success: boolean }>(
				EUpdateTaskStoreApiRoutes.update + '/' + taskId,
				target,
			)

			if (!data?.success) {
				return false
			}

			return true
		} catch (e) {
			console.log(e)
			return false
		}
	},
}))
