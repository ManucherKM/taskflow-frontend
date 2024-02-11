// Types
import type { FC } from 'react'

// Components
import { AccountForm, LayoutUserSetting } from '@/components'
import { Separator } from '@radix-ui/react-context-menu'
import { useTranslation } from 'react-i18next'

/** Component for editing application settings. */
export const Account: FC = () => {
	const { t } = useTranslation()

	return (
		<LayoutUserSetting>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">{t('account')}</h3>
					<p className="text-sm text-muted-foreground">
						{t(
							'update_your_account_settings_set_your_preferred_language_and_time_zone',
						)}
					</p>
				</div>
				<Separator />
				<AccountForm />
			</div>
		</LayoutUserSetting>
	)
}
