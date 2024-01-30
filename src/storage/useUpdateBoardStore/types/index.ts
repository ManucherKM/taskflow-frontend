export interface IUpdateBoardStore {
	id: string

	isShow: boolean

	setIsShow: (target: boolean) => void

	setId: (id: string) => void
}
