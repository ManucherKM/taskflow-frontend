import { cn } from '@/lib/utils'
import type { FC, HTMLAttributes, ReactNode } from 'react'

export interface ITypographyP extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode
}

export const TypographyP: FC<ITypographyP> = ({
	children,
	className,
	...props
}) => {
	const styles = cn(['leading-7 [&:not(:first-child)]:mt-6', className])
	return (
		<p className={styles} {...props}>
			{children}
		</p>
	)
}
