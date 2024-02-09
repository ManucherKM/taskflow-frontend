import { useThemeColorStore } from '@/storage'
import { FC, ReactNode, useEffect } from 'react'

export interface IThemeColorProvider {
	children: ReactNode
}

export const ThemeColorProvider: FC<IThemeColorProvider> = ({ children }) => {
	const theme = useThemeColorStore(store => store.theme)

	useEffect(() => {
		if (document.body.classList.contains('zinc')) {
			document.body.classList.remove('zinc')
		} else if (document.body.classList.contains('rose')) {
			document.body.classList.remove('rose')
		} else if (document.body.classList.contains('green')) {
			document.body.classList.remove('green')
		} else if (document.body.classList.contains('blue')) {
			document.body.classList.remove('blue')
		} else if (document.body.classList.contains('orange')) {
			document.body.classList.remove('orange')
		}

		document.body.classList.add(theme)
	}, [theme])

	return children
}
