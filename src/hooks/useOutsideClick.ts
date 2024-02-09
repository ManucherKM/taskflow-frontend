import { MutableRefObject, useEffect, useState } from 'react'

export function useOutsideClick(ref: MutableRefObject<HTMLDivElement | null>) {
	const [isContain, setIsContain] = useState<boolean | null>(null)

	function clickHandler(event: MouseEvent) {
		const isContain = ref.current?.contains(event.target as Node)

		if (typeof isContain == 'undefined') return

		setIsContain(isContain)
	}

	useEffect(() => {
		document.addEventListener('mousedown', clickHandler)

		return () => {
			document.removeEventListener('mousedown', clickHandler)
		}
	}, [])

	return isContain
}
