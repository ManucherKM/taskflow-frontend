import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SlideLeft } from '..'
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
					<TabsTrigger className="w-full" value="userName">
						Имя пользователя
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
		</>
	)
}
