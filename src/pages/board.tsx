import { NavBar, toast } from '@/components'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useBoardStore } from '@/storage'
import { IDeepBoard } from '@/storage/useBoardStore/types'
import { useEffect, useState, type FC } from 'react'
import { useNavigate, useParams } from 'react-router'

export const Board: FC = () => {
	const { id } = useParams()
	const [board, setBoard] = useState<IDeepBoard | null>(null)

	const loader = useLoader()

	const navigate = useNavigate()

	const getDeepBoard = useBoardStore(store => store.getDeepBoard)

	useEffect(() => {
		if (!id) {
			navigate(ERoutes.home)
			return
		}

		const fetchBoard = async () => {
			try {
				const board = await loader(getDeepBoard, id)

				if (!board) {
					toast({
						title: 'Не удалось получить доску',
						description: 'Возможно данной доски не существует',
					})

					navigate(ERoutes.home)

					return
				}

				console.log(board)

				setBoard(board)
			} catch (e) {
				console.log(e)
			}
		}

		fetchBoard()
	}, [])
	return (
		<>
			<NavBar />
			<div>{id}</div>
		</>
	)
}
