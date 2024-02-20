import { useEffect } from 'react'
import { useWindowFocus } from '.'

export function useFuncWhenWindowFocus(func: () => void) {
	const isFocus = useWindowFocus()

	useEffect(() => {
		if (!isFocus) return

		func()
	}, [isFocus])
}
