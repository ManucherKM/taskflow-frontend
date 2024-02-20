import { useEffect, useState } from 'react'

export function useWindowFocus(func: () => void) {
	const [isFocus, setIsFocus] = useState<boolean>(true)

	function focusHandler() {
		setIsFocus(true)
	}

	function blurHandler() {
		setIsFocus(false)
	}

	useEffect(() => {
		window.addEventListener('focus', focusHandler)
		window.addEventListener('blur', blurHandler)

		return () => {
			window.removeEventListener('focus', focusHandler)
			window.removeEventListener('blur', blurHandler)
		}
	}, [])

	useEffect(() => {
		if (!isFocus) return

		func()
	}, [isFocus])

	return isFocus
}
