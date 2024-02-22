import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { SlideLeft } from '../slide-left'
import { UserEmailForm } from './user-email-form'
import { UserNameForm } from './user-name-form'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
	const { t } = useTranslation()

	return (
		<Tabs defaultValue="email">
			<TabsList className="w-full">
				<TabsTrigger className="w-full" value="email">
					{t('mail')}
				</TabsTrigger>
				<TabsTrigger className="w-full" value="userName">
					{t('username')}
				</TabsTrigger>
			</TabsList>
			<TabsContent value="email">
				<SlideLeft>
					<UserEmailForm {...props} />
				</SlideLeft>
			</TabsContent>
			<TabsContent value="userName">
				<SlideLeft>
					<UserNameForm {...props} />
				</SlideLeft>
			</TabsContent>
		</Tabs>
	)
}
