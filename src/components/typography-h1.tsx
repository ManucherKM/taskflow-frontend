import type { FC, ReactNode } from 'react'

export interface ITypographyH1 {
	children: ReactNode
}

export const TypographyH1: FC<ITypographyH1> = ({ children }) => {
	return (
		<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{children}
		</h1>
	)
}
