import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
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
					<motion.div
						key={'login-form-with-email'}
						initial={{ opacity: 0, x: '100px' }}
						animate={{ opacity: 1, x: '0' }}
						exit={{ opacity: 0, x: '-100px' }}
						transition={{ duration: '0.2' }}
					>
						<UserEmailForm {...props} />
					</motion.div>
				</TabsContent>
				<TabsContent value="userName">
					<motion.div
						key={'login-form-with-user-name'}
						initial={{ opacity: 0, x: '100px' }}
						animate={{ opacity: 1, x: '0' }}
						exit={{ opacity: 0, x: '100px' }}
						transition={{ duration: '0.2' }}
					>
						<UserNameForm {...props} />
					</motion.div>
				</TabsContent>
			</Tabs>
		</>
	)
}
