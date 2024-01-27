import type { FC, ReactNode } from 'react'
import { Toaster } from './ui/toaster'

export interface IToasterProvider {
	children: ReactNode
}

export const ToasterProvider: FC<IToasterProvider> = ({ children }) => {
	return (
		<>
			<Toaster />
			{children}
		</>
	)
}
