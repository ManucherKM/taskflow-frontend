import { Icons } from '.'

export const Logo = () => {
	return (
		<>
			<Icons.logoBlack className="block dark:hidden" />
			<Icons.logoWhite className="hidden dark:block" />
		</>
	)
}
