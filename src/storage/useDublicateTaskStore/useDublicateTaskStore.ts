// Types
import { IDublicateTaskStore } from './types'

// Utils
import { create } from 'zustand'

const defaultStore = {
	stageId: null,
} as IDublicateTaskStore

export const useDublicateTaskStore = create<IDublicateTaskStore>(set => ({
	...defaultStore,
	setStageId(target) {
		set({ stageId: target })
	},
}))
