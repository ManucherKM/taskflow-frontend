import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { ERoutes } from '@/config/routes'
import {
	TLoginWithNameFormSchema,
	useLoader,
	useLoginWithNameFormSchema,
} from '@/hooks'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { PasswordInput } from '../password-input'
import { TypographyP } from '../typography-p'

interface UserNameFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserNameForm({ className, ...props }: UserNameFormProps) {
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)

	const login = useAuthStore(store => store.loginWithUserName)

	const formSchema = useLoginWithNameFormSchema()
	const loader = useLoader()
	const { t } = useTranslation()
	const navigation = useNavigate()

	const form = useForm<TLoginWithNameFormSchema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: '',
			password: '',
		},
	})

	async function onSubmit(data: TLoginWithNameFormSchema) {
		try {
			const isSuccess = await loader(login, data)

			if (!isSuccess) {
				toast({
					title: t('invalid_user_name_or_password'),
				})
				return
			}

			navigation(ERoutes.home)
		} catch (e) {}
	}

	function sendHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<form className="w-full space-y-6">
					<FormField
						control={form.control}
						name="userName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('username')}</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="mypersonalname"
										onKeyDown={e => {
											if (e.key === 'Enter') {
												passwordInputRef.current?.focus()
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('password')}</FormLabel>
								<FormControl>
									<PasswordInput
										{...field}
										placeholder="MyPassword1!?"
										ref={e => {
											field.ref(e)
											passwordInputRef.current = e
										}}
										onKeyDown={e => {
											if (e.key === 'Enter') {
												loginButtonRef.current?.click()
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="w-full flex justify-end !mt-2">
						<Link to={ERoutes.restoreAccountEmail}>
							<TypographyP className="text-xs hover:underline text-muted-foreground">
								{t('forgot_your_password')}
							</TypographyP>
						</Link>
					</div>

					<Button
						ref={loginButtonRef}
						onClick={sendHandler}
						type="button"
						disabled={!form.formState.isValid}
						className="w-full"
					>
						{t('sign_in')}
					</Button>
				</form>
			</Form>
		</div>
	)
}
