import { cn } from '@/lib/utils'
import type { FC, HTMLAttributes, ReactNode } from 'react'

export interface ITypographyH2 extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode
}

export const TypographyH2: FC<ITypographyH2> = ({
	children,
	className,
	...props
}) => {
	return (
		<h2
			className={cn([
				'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
				className,
			])}
			{...props}
		>
			{children}
		</h2>
	)
}
