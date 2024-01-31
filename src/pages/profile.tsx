import { LayoutUserSetting } from '@/components'
import { ProfileForm } from '@/components/profile-form'
import type { FC } from 'react'

export const Profile: FC = () => {
	return (
		<LayoutUserSetting>
			<ProfileForm />
		</LayoutUserSetting>
	)
}
