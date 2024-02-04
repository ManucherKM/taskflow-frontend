// Types
import { type IOpenTaskStore } from './types'

// Utils
import { create } from 'zustand'

const defaultStore = {
	isShow: false,
	task: null,
} as IOpenTaskStore

export const useOpenTaskStore = create<IOpenTaskStore>(set => ({
	...defaultStore,
	setIsShow(isShow) {
		set({ isShow })
	},
	setTask(task) {
		set({ task })
	},
}))
