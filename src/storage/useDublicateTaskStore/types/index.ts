export interface IDublicateTaskStore {
	stageId: string | null

	setStageId: (target: string) => void
}
