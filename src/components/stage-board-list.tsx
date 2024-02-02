import { IStage } from '@/storage/useBoardStore/types'
import type { FC } from 'react'
import { List } from '.'
import { StageBoard } from './stage-board'

export interface IStageBoardList {
	stages: IStage[]
}

export const StageBoardList: FC<IStageBoardList> = ({ stages }) => {
	return (
		<List
			arr={stages}
			callback={stage => <StageBoard key={stage._id} stage={stage} />}
		/>
	)
}
