import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { SlideLeft } from '../slide-left'
import { UserEmailForm } from './user-email-form'
import { UserNameForm } from './user-name-form'

export enum ETabVariants {
	email = 'email',
	userName = 'username',
}

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
	const [searchParams, setSearchParams] = useSearchParams()

	const { t } = useTranslation()

	function changeHandler(value: string) {
		setSearchParams({
			variant: value,
		})
	}

	let defaultValue

	if (searchParams.get('variant')?.toLowerCase() === ETabVariants.userName) {
		defaultValue = ETabVariants.userName
	} else {
		defaultValue = ETabVariants.email
	}

	return (
		<Tabs defaultValue={defaultValue} onValueChange={changeHandler}>
			<TabsList className="w-full">
				<TabsTrigger className="w-full" value={ETabVariants.email}>
					{t('mail')}
				</TabsTrigger>
				<TabsTrigger className="w-full" value={ETabVariants.userName}>
					{t('username')}
				</TabsTrigger>
			</TabsList>
			<TabsContent value={ETabVariants.email}>
				<SlideLeft>
					<UserEmailForm {...props} />
				</SlideLeft>
			</TabsContent>
			<TabsContent value={ETabVariants.userName}>
				<SlideLeft>
					<UserNameForm {...props} />
				</SlideLeft>
			</TabsContent>
		</Tabs>
	)
}
