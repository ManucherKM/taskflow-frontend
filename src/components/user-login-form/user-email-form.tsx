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
import { useLoader, useLoginWithEmailFormSchema } from '@/hooks'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import { PasswordInput } from '../password-input'
import { TypographyP } from '../typography-p'

interface UserEmailFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserEmailForm({ className, ...props }: UserEmailFormProps) {
	const { t } = useTranslation()

	const formSchema = useLoginWithEmailFormSchema()

	const emailInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)
	const login = useAuthStore(store => store.loginWithEmail)
	const loader = useLoader()

	const navigation = useNavigate()

	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			const isSuccess = await loader(login, data)

			if (!isSuccess) {
				toast({
					title: t('invalid_e_mail_or_password'),
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

	useEffect(() => {
		if (!emailInputRef.current) return

		emailInputRef.current.focus()
	}, [emailInputRef.current])
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
										placeholder="name@example.com"
										{...field}
										ref={e => {
											field.ref(e)
											emailInputRef.current = e
										}}
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
										placeholder="MyPassword1!?"
										{...field}
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
						disabled={!form.formState.isDirty || !form.formState.isValid}
						className="w-full"
					>
						{t('sign_in')}
					</Button>
				</form>
			</Form>
		</div>
	)
}
