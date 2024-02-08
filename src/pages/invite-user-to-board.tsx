import { toast } from '@/components'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useBoardStore } from '@/storage'
import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export const InviteUserToBoard: FC = () => {
	const { id } = useParams()

	const inviteToDashboard = useBoardStore(store => store.inviteToDashboard)

	const navigate = useNavigate()

	const loader = useLoader()

	async function submit() {
		try {
			if (!id) {
				return
			}

			const updatedBoard = await loader(inviteToDashboard, id)

			if (!updatedBoard) {
				toast({
					title: 'Не удалось присоедениться к доске',
				})

				navigate(ERoutes.home)
				return
			}

			toast({
				title: 'Присоединение к доске прошло успешно',
			})

			navigate(ERoutes.dashboard + '/' + id)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		submit()
	}, [])
	return <div>{id}</div>
}
