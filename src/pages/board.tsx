import { NavBar } from '@/components'
import type { FC } from 'react'
import { useParams } from 'react-router'

export const Board: FC = () => {
	const { id } = useParams()

	return (
		<>
			<NavBar />
			<div>{id}</div>
		</>
	)
}
