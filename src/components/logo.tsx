import { Icons } from './icons'

export const Logo = () => {
	return (
		<>
			<Icons.logoBlack className="block dark:hidden" />
			<Icons.logoWhite className="hidden dark:block" />
		</>
	)
}
