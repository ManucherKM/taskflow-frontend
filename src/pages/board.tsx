import type { FC } from 'react'
import { useParams } from 'react-router'

export const Board: FC = () => {
	const { id } = useParams()
	return <div>{id}</div>
}
