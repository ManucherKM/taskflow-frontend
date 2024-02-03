// Types
import axios from '@/config/axios'
import { ETaskStoreApiRoutes, ITask, ITaskStore } from './types'

// Utils
import { create } from 'zustand'

export const useTaskStore = create<ITaskStore>(() => ({
	async duplication(id) {
		try {
			const { data } = await axios.post<ITask>(ETaskStoreApiRoutes.duplicate, {
				id,
			})

			if (!data) {
				return false
			}

			return data
		} catch (e) {
			console.error(e)
			return false
		}
	},
	async update(id, target) {
		try {
			const { data } = await axios.patch<{ success?: boolean }>(
				ETaskStoreApiRoutes.main + '/' + id,
				target,
			)

			if (!data?.success) {
				return false
			}

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	},
	async remove(id) {
		try {
			const { data } = await axios.delete<{ success?: boolean }>(
				ETaskStoreApiRoutes.main + '/' + id,
			)

			if (!data?.success) {
				return false
			}

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	},
}))
