import { useLoader } from '@/hooks'
import { useAuthStore, useBoardStore, useUserStore } from '@/storage'
import { useEffect, type FC, type ReactNode } from 'react'
import { toast } from './ui/use-toast'

export interface IInitProvider {
	children: ReactNode
}

export const InitProvider: FC<IInitProvider> = ({ children }) => {
	const token = useAuthStore(store => store.token)
	const getUser = useUserStore(store => store.getUser)
	const loader = useLoader()
	const getAllBoards = useBoardStore(store => store.getAllBoards)

	useEffect(() => {
		if (!token) return

		const fetch = async () => {
			try {
				const fetchedBoards = await getAllBoards()

				if (!fetchedBoards) {
					toast({
						title: 'Не удалось получить список досок',
					})
				}

				const fetchedUser = await getUser()

				if (!fetchedUser) {
					toast({
						title: 'Не удалось получить информацию об аккаунте',
					})
				}
			} catch (e) {
				console.log(e)
			}
		}

		loader(fetch)
	}, [token])
	return <>{children}</>
}
