import { IStage } from '@/storage/useStageStore/types'
import type { FC } from 'react'
import { List } from '.'
import { StageBoard } from './stage-board'

export interface IStageBoardList {
	stages: IStage[]
	boardId: string
}

export const StageBoardList: FC<IStageBoardList> = ({ stages, boardId }) => {
	return (
		<List
			arr={stages}
			callback={stage => (
				<StageBoard boardId={boardId} key={stage._id} stage={stage} />
			)}
		/>
	)
}
