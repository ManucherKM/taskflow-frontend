import { MutableRefObject, useState } from 'react'

export function useOutsideClick(ref: MutableRefObject<HTMLDivElement | null>) {
	const [isContain, setIsContain] = useState<boolean>(false)

	return [
		isContain,
		function (event: MouseEvent) {
			const isContain = ref.current?.contains(event.target as Node)

			if (typeof isContain == 'undefined') return

			setIsContain(isContain)
		},
	] as [boolean, (event: MouseEvent) => void]
}
