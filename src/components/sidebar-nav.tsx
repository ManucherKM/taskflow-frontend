import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

import { useSidebarNavItems } from '@/hooks'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
	const { pathname } = useLocation()

	const sidebarNavItems = useSidebarNavItems()

	return (
		<nav
			className={cn(
				'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
				className,
			)}
			{...props}
		>
			{sidebarNavItems.map(item => (
				<Link
					key={item.to}
					to={item.to}
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						pathname === item.to
							? 'bg-muted hover:bg-muted'
							: 'hover:bg-transparent hover:underline',
						'justify-start',
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	)
}
