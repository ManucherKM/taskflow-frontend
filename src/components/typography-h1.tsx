import clsx from 'clsx'
import type { FC, HTMLAttributes, ReactNode } from 'react'

export interface ITypographyH1 extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode
}

export const TypographyH1: FC<ITypographyH1> = ({
	children,
	className,
	...props
}) => {
	return (
		<h1
			className={clsx([
				'scroll-m-20 font-extrabold tracking-tight text-2xl md:text-3xl lg:text-5xl',
				className,
			])}
			{...props}
		>
			{children}
		</h1>
	)
}
