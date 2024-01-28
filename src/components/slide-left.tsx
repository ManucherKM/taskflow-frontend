import type { FC, ReactNode } from 'react'

import { motion } from 'framer-motion'

export interface ISlideLeft {
	children: ReactNode
}

export const SlideLeft: FC<ISlideLeft> = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: '100px' }}
			animate={{ opacity: 1, x: '0' }}
			exit={{ opacity: 0, x: '100px' }}
			transition={{ duration: '0.2' }}
		>
			{children}
		</motion.div>
	)
}
