import { useDisplayStore } from '@/storage'
import { EFont } from '@/storage/useDisplayStore/types'
import clsx from 'clsx'
import { FC, ReactNode, useEffect } from 'react'

export interface IFontProvider {
	children: ReactNode
}

export const FontProvider: FC<IFontProvider> = ({ children }) => {
	const font = useDisplayStore(store => store.font)

	useEffect(() => {
		const styles = clsx([
			font === 'sans' && 'font-sans',
			font === 'mono' && 'font-mono',
			font === 'serif' && 'font-serif',
		])

		if (document.body.classList.contains('font-' + EFont.sans)) {
			document.body.classList.remove('font-' + EFont.sans)
		}

		if (document.body.classList.contains('font-' + EFont.mono)) {
			document.body.classList.remove('font-' + EFont.mono)
		}

		if (document.body.classList.contains('font-' + EFont.serif)) {
			document.body.classList.remove('font-' + EFont.serif)
		}

		document.body.classList.add(styles)
	}, [font])
	return <>{children}</>
}
