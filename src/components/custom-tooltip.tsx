import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { FC, ReactNode } from 'react'

export interface IStageCustomTooltip {
	children: ReactNode
	text: string
}

export const CustomTooltip: FC<IStageCustomTooltip> = ({ children, text }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent className="max-w-64 w-full text-justify">
					<p>{text}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
