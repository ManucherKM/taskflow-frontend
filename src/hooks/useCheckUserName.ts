import { useAuthStore } from '@/storage'
import { useState } from 'react'

export function useCheckUserName() {
	const [isExist, setIsExist] = useState<boolean>(false)

	const checkUserName = useAuthStore(store => store.checkUserName)

	async function checkUserNameHandler(userName: string) {
		try {
			const isValid = await checkUserName(userName)

			setIsExist(!!isValid)
		} catch (e) {
			console.error(e)
		}
	}

	return { isExist, checkUserNameHandler }
}
