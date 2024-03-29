import type { FC, ReactNode } from 'react'

import { motion } from 'framer-motion'

export interface ISlideLeft {
	children: ReactNode
}

export const SlideLeft: FC<ISlideLeft> = ({ children }) => {
	return (
		<motion.div
			// key={'slide-left' + Math.random()}
			initial={{ opacity: 0, x: '100px' }}
			animate={{ opacity: 1, x: '0px' }}
			exit={{ opacity: 0, x: '100px' }}
			transition={{
				duration: '0.4',
				type: 'spring',
				bounce: 0.4,
			}}
		>
			{children}
		</motion.div>
	)
}
