// Types
import axios from '@/config/axios'
import { EUpdateStageStoreApiRoutes, type IUpdateStageStore } from './types'

// Utils
import { create } from 'zustand'
import { IStage } from '../useStageStore/types'

const defaultStore = {
	isShow: false,
	stage: null,
} as IUpdateStageStore

export const useUpdateStageStore = create<IUpdateStageStore>((set, get) => ({
	...defaultStore,
	setIsShow(isShow) {
		set({ isShow })
	},
	setStage(stage) {
		set({ stage })
	},
	async update(target) {
		try {
			const stage = get().stage

			if (!stage) return

			const { data } = await axios.patch<IStage>(
				EUpdateStageStoreApiRoutes.update + '/' + stage._id,
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
