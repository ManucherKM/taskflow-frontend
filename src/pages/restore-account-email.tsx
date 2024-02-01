import { NavBarBack, RestoreAccountEmailForm, SlideLeft } from '@/components'
import type { FC } from 'react'

export const RestoreAccountEmail: FC = () => {
	return (
		<div className="overflow-hidden">
			<NavBarBack />

			<SlideLeft>
				<div className="container flex justify-center items-center h-[calc(100vh-56px)]">
					<RestoreAccountEmailForm />
				</div>
			</SlideLeft>
		</div>
	)
}
