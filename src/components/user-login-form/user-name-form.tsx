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
import { cn } from '@/lib/utils'
import { useAuthStore, useStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import { TypographyP } from '../typography-p'

const FormSchema = z.object({
	userName: z.string().min(2, {
		message: 'Имя пользователя должно состоять минимум из 2 символов.',
	}),
	password: z.string().min(8, {
		message: 'Пароль должен иметь не менее 8 символов и не более 32.',
	}),
})

interface UserNameFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserNameForm({ className, ...props }: UserNameFormProps) {
	const nameInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)
	const login = useAuthStore(store => store.loginWithUserName)
	const setLoading = useStore(store => store.setLoading)
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
			setLoading(true)
			const isSuccess = await login(data)

			if (!isSuccess) {
				toast({
					title: 'Неверное имя пользователя или пароль',
				})
				return
			}

			navigation(ERoutes.home)
		} catch (e) {
		} finally {
			setLoading(false)
		}
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
									<FormLabel>Имя пользователя</FormLabel>
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
									<FormLabel>Пароль</FormLabel>
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
									Забыли пароль?
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
							Войти
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}
