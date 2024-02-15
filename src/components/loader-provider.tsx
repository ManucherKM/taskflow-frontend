import { useStore } from '@/storage'
import type { FC, ReactNode } from 'react'
import { Icons } from './icons'

export interface ILoaderProvider {
	children: ReactNode
}

export const LoaderProvider: FC<ILoaderProvider> = ({ children }) => {
	// Loading state.
	const isLoading = useStore(store => store.isLoading)

	return (
		<>
			{isLoading && (
				<div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-accent/75 z-[100]">
					<Icons.spinner className="animate-spin text-foreground" />
				</div>
			)}
			{children}
		</>
	)
}
