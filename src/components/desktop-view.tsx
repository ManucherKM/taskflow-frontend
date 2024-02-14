import { useDeviceSize } from '@/hooks'
import { FC, ReactNode } from 'react'

export interface IDesktopView {
	children: ReactNode
}

export const DesktopView: FC<IDesktopView> = ({ children }) => {
	const { width } = useDeviceSize()

	return <>{width >= 640 && children}</>
}
