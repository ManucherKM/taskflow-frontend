import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Icons } from './icons'
import { InputProps } from './ui/input'

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>

const Search = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<label
				className={cn(
					'flex items-center justify-center rounded-md border border-input bg-background px-3 ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
					className,
				)}
			>
				<Icons.search className="cursor-pointer" />
				<input
					{...props}
					ref={ref}
					className="w-full py-2 px-3 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-background text-sm "
				/>
			</label>
		)
	},
)

Search.displayName = 'Search'

export { Search }
