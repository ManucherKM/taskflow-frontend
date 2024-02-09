// Types
import type { FC } from 'react'

// Components
import { NavBarBack, RestoreAccountPasswordForm, SlideLeft } from '@/components'

/** A component for changing a user's password. */
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
