import { useDeviceSize } from '@/hooks'
import { FC, ReactNode } from 'react'

export interface IMobileView {
	children: ReactNode
}

export const MobileView: FC<IMobileView> = ({ children }) => {
	const { width } = useDeviceSize()

	return <>{width < 640 && children}</>
}
