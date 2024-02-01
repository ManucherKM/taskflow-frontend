import { NavBarBack, RestoreAccountPasswordForm, SlideLeft } from '@/components'
import type { FC } from 'react'

export const RestoreAccountPassword: FC = () => {
	return (
		<div className="overflow-hidden">
			<NavBarBack />

			<SlideLeft>
				<div className="container">
					<RestoreAccountPasswordForm />
				</div>
			</SlideLeft>
		</div>
	)
}
