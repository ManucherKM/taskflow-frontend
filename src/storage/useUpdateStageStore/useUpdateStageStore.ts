// Types
import axios from '@/config/axios'
import { EUpdateStageStoreApiRoutes, type IUpdateStageStore } from './types'

// Utils
import { create } from 'zustand'
import { IStage } from '../useStageStore/types'

const defaultStore = {
	isShow: false,
	stageId: null,
} as IUpdateStageStore

export const useUpdateStageStore = create<IUpdateStageStore>((set, get) => ({
	...defaultStore,
	setIsShow(isShow) {
		set({ isShow })
	},
	setStageId(stageId) {
		set({ stageId })
	},
	async update(target) {
		try {
			const stageId = get().stageId

			if (!stageId) return

			const { data } = await axios.patch<IStage>(
				EUpdateStageStoreApiRoutes.update + '/' + stageId,
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
