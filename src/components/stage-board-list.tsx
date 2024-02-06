import { IStage } from '@/storage/useStageStore/types'
import { useState, type DragEvent, type FC } from 'react'
import { List } from '.'
import { StageBoard } from './stage-board'

export interface IStageBoardList {
	onChangeStages: (stages: IStage[]) => void
	stages: IStage[]
	boardId: string
}

export const StageBoardList: FC<IStageBoardList> = ({
	stages,
	boardId,
	onChangeStages,
}) => {
	const [startStage, setStartStage] = useState<IStage | null>(null)

	function dragStartHandler(e: DragEvent<HTMLDivElement>, stage: IStage) {
		setStartStage(stage)
	}

	function dragEndHandler(e: DragEvent<HTMLDivElement>) {
		setStartStage(null)
	}

	function dragOverHandler(e: DragEvent<HTMLDivElement>) {
		e.preventDefault()

		if ((e.target as HTMLDivElement).dataset.id) {
			;(e.target as HTMLDivElement).style.opacity = '0.5'
		}
	}

	function dragLeaveHandler(e: DragEvent<HTMLDivElement>) {
		;(e.target as HTMLDivElement).style.removeProperty('opacity')
	}

	function dropHandler(e: DragEvent<HTMLDivElement>, stage: IStage) {
		e.preventDefault()
		;(e.target as HTMLDivElement).style.removeProperty('opacity')

		if (!startStage) {
			return
		}

		const newStages = stages.map(pred => {
			if (pred._id === startStage._id) {
				return { ...stage }
			}

			if (pred._id === stage._id) {
				return { ...startStage }
			}

			return pred
		})

		onChangeStages(newStages)
	}

	return (
		<List
			arr={stages}
			callback={stage => (
				<StageBoard
					onDragEnd={dragEndHandler}
					onDragStart={e => dragStartHandler(e, stage)}
					onDragOver={dragOverHandler}
					onDragLeave={dragLeaveHandler}
					onDrop={e => dropHandler(e, stage)}
					draggable={true}
					disableEvents={!!stage}
					data-id={stage._id}
					boardId={boardId}
					key={stage._id}
					stage={stage}
				/>
			)}
		/>
	)
}
