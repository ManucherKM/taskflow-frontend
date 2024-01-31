import { useLoader } from '@/hooks'
import { useBoardStore, useUserStore } from '@/storage'
import { useEffect, type FC, type ReactNode } from 'react'
import { toast } from './ui/use-toast'

export interface IInitProvider {
	children: ReactNode
}

export const InitProvider: FC<IInitProvider> = ({ children }) => {
	const getUser = useUserStore(store => store.getUser)
	const loader = useLoader()
	const getAllBoards = useBoardStore(store => store.getAllBoards)

	useEffect(() => {
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
	}, [])
	return <>{children}</>
}
