// Types
import type { FC } from 'react'

// Components
import { DisplayForm, LayoutUserSetting } from '@/components'

/** A component for changing application settings. */
export const Display: FC = () => {
	return (
		<LayoutUserSetting>
			<DisplayForm />
		</LayoutUserSetting>
	)
}
