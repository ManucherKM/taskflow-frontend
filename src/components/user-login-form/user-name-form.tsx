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
import { useLoader } from '@/hooks'
import { cn } from '@/lib/utils'
import { i18next } from '@/locales'
import { useAuthStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import { TypographyP } from '../typography-p'

const FormSchema = z.object({
	userName: z
		.string()
		.min(2, {
			message: i18next.t('the_username_must_be_at_least_2_characters_long'),
		})
		.max(30, {
			message: i18next.t('the_username_must_not_exceed_30_characters'),
		}),
	password: z.string().min(8, {
		message: i18next.t(
			'the_password_must_have_at_least_8_characters_and_no_more_than_32_characters',
		),
	}),
})

interface UserNameFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserNameForm({ className, ...props }: UserNameFormProps) {
	const { t } = useTranslation()

	const nameInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)
	const login = useAuthStore(store => store.loginWithUserName)
	const loader = useLoader()

	const navigation = useNavigate()

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			userName: '',
			password: '',
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
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

	useEffect(() => {
		if (!nameInputRef.current) return

		nameInputRef.current.focus()
	}, [nameInputRef.current])
	return (
		<>
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
											placeholder="mypersonalname"
											{...field}
											ref={e => {
												field.ref(e)
												nameInputRef.current = e
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
										<Input
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
		</>
	)
}
