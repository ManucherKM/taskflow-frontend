// Types
import axios from '@/config/axios'
import { ECreateStageStoreApiRoutes, type ICreateStageStore } from './types'

// Utils
import { create } from 'zustand'
import { IStage } from '../useStageStore/types'

const defaultStore = {
	isShow: false,
	boardId: null,
} as ICreateStageStore

export const useCreateStageStore = create<ICreateStageStore>((set, get) => ({
	...defaultStore,
	setIsShow(isShow) {
		set({ isShow })
	},
	setBoardId(boardId) {
		set({ boardId })
	},
	async create(target) {
		try {
			const boardId = get().boardId

			if (!boardId) return

			const { data } = await axios.post<IStage>(
				ECreateStageStoreApiRoutes.create,
				{
					...target,
					boardId,
				},
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
