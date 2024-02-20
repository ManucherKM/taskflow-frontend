import { useEffect, useRef, useState } from 'react'

export function useWindowFocus() {
	const [isFocus, setIsFocus] = useState<boolean>(true)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const inactivityLimit = 5000

	function disableFocus() {
		setIsFocus(false)
	}

	function mouseMoveHandler() {
		setIsFocus(true)

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = setTimeout(disableFocus, inactivityLimit)
		} else {
			timeoutRef.current = setTimeout(disableFocus, inactivityLimit)
		}
	}

	function documentVisibilityHandler() {
		setIsFocus(!document.hidden)
	}

	useEffect(() => {
		window.addEventListener('mousemove', mouseMoveHandler)
		document.addEventListener('visibilitychange', documentVisibilityHandler)

		return () => {
			window.removeEventListener('mousemove', mouseMoveHandler)
		}
	}, [])

	return isFocus
}
