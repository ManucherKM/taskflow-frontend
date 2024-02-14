import { useEffect, useState } from 'react'

export function useDeviceSize() {
	const [width, setWidth] = useState<number>(0)

	function handleWindowSizeChange() {
		setWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)

		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	return { width }
}
