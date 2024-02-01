import { NavBarBack, RestoreAccountOTPForm, SlideLeft } from '@/components'
import type { FC } from 'react'

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
