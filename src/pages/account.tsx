import { AccountForm, LayoutUserSetting } from '@/components'
import { Separator } from '@radix-ui/react-context-menu'

export function Account() {
	return (
		<LayoutUserSetting>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Аккаунт</h3>
					<p className="text-sm text-muted-foreground">
						Обновите настройки своей учетной записи. Установите предпочитаемый
						язык и часовой пояс.
					</p>
				</div>
				<Separator />
				<AccountForm />
			</div>
		</LayoutUserSetting>
	)
}
