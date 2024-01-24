import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import { UserEmailForm } from './user-email-form'
import { UserNameForm } from './user-name-form'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
	return (
		<>
			<Tabs defaultValue="email">
				<TabsList className="w-full">
					<TabsTrigger className="w-full" value="email">
						Почта
					</TabsTrigger>
					<TabsTrigger className="w-full" value="username">
						Имя пользователя
					</TabsTrigger>
				</TabsList>
				<TabsContent value="email">
					<UserEmailForm {...props} />
				</TabsContent>
				<TabsContent value="username">
					<UserNameForm {...props} />
				</TabsContent>
			</Tabs>
		</>
	)
}
