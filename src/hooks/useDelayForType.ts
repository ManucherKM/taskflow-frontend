import { useRef } from 'react'

export function useDelayForType() {
	const timer = useRef<NodeJS.Timeout | null>(null)

	return function <T extends unknown>(cb: () => T) {
		let res

		if (timer.current === null) {
			timer.current = setTimeout(() => (res = cb()), 300)
			return
		}

		clearTimeout(timer.current)

		timer.current = setTimeout(() => (res = cb()), 300)

		return res as T
	}
}
