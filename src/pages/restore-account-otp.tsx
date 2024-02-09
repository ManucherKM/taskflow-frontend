// Types
import type { FC } from 'react'

// Components
import { NavBarBack, RestoreAccountOTPForm, SlideLeft } from '@/components'

/** Component to get the one-time code that came to the user. */
export const RestoreAccountOTP: FC = () => {
	return (
		<div className="overflow-hidden">
			<NavBarBack />

			<SlideLeft>
				<div className="container">
					<RestoreAccountOTPForm />
				</div>
			</SlideLeft>
		</div>
	)
}
