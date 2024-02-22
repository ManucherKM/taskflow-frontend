import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { ERoutes } from '@/config/routes'
import {
	TLoginWithEmailFormSchema,
	useLoader,
	useLoginWithEmailFormSchema,
} from '@/hooks'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, MouseEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { PasswordInput } from '../password-input'
import { TypographyP } from '../typography-p'

interface UserEmailFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserEmailForm({ className, ...props }: UserEmailFormProps) {
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)

	const formSchema = useLoginWithEmailFormSchema()
	const login = useAuthStore(store => store.loginWithEmail)
	const loader = useLoader()
	const { t } = useTranslation()
	const navigation = useNavigate()

	const form = useForm<TLoginWithEmailFormSchema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(data: TLoginWithEmailFormSchema) {
		try {
			const isSuccess = await loader(login, data)

			if (!isSuccess) {
				toast({
					title: t('invalid_e_mail_or_password'),
				})
				return
			}

			navigation(ERoutes.home)
		} catch (e) {
			console.error(e)
		}
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
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('mail')}</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="name@example.com"
										autoFocus
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
