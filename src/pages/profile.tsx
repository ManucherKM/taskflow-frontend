// Types
import type { FC } from 'react'

// Components
import { LayoutUserSetting, ProfileForm } from '@/components'

/** Component for modifying user data. */
export const Profile: FC = () => {
	return (
		<LayoutUserSetting>
			<ProfileForm />
		</LayoutUserSetting>
	)
}
