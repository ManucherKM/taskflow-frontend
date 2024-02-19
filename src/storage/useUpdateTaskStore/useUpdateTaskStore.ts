// Types
import axios from '@/config/axios'
import { EUpdateTaskStoreApiRoutes, type IUpdateTaskStore } from './types'

// Utils
import { create } from 'zustand'
import { ITask } from '../useTaskStore/types'

const defaultStore = {
	isShow: false,
	task: null,
} as IUpdateTaskStore

export const useUpdateTaskStore = create<IUpdateTaskStore>((set, get) => ({
	...defaultStore,
	setIsShow(isShow) {
		set({ isShow })
	},
	setTask(task) {
		set({ task })
	},
	async update(target) {
		try {
			const task = get().task

			if (!task) return

			const { data } = await axios.patch<ITask>(
				EUpdateTaskStoreApiRoutes.update + '/' + task._id,
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
