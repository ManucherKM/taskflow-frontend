// Types
import axios from '@/config/axios'
import { EStageStoreApiRoutes, IStage, type IStageStore } from './types'

// Utils
import { create } from 'zustand'

export const useStageStore = create<IStageStore>(() => ({
	async duplication(id, boardId) {
		try {
			const { data } = await axios.post<IStage>(
				EStageStoreApiRoutes.duplicate,
				{
					id,
					boardId,
				},
			)

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
			const { data } = await axios.patch<IStage>(
				EStageStoreApiRoutes.main + '/' + id,
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
	async remove(id) {
		try {
			const { data } = await axios.delete<{ success?: boolean }>(
				EStageStoreApiRoutes.main + '/' + id,
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
