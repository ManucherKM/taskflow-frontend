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
import { cn } from '@/lib/utils'
import { useAuthStore, useStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import { TypographyP } from '../typography-p'

const FormSchema = z.object({
	email: z
		.string()
		.regex(
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
			{
				message: 'Введите корректную почту',
			},
		),
	password: z.string().min(8, {
		message: 'Пароль должен иметь не менее 8 символов и не более 32.',
	}),
})

interface UserEmailFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserEmailForm({ className, ...props }: UserEmailFormProps) {
	const emailInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)
	const login = useAuthStore(store => store.loginWithEmail)
	const setLoading = useStore(store => store.setLoading)
	const navigation = useNavigate()

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			setLoading(true)
			const isSuccess = await login(data)

			if (!isSuccess) {
				toast({
					title: 'Неверная почта или пароль',
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
								<FormLabel>Почта</FormLabel>
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
	)
}
