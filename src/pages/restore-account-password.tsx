import {
	Button,
	Input,
	NavBarBack,
	SlideLeft,
	TypographyH3,
	toast,
} from '@/components'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { ERoutes } from '@/config/routes'
import { useRestoreAccount, useStore } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useRef, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'

const FormSchema = z.object({
	password: z.string().min(8, {
		message: 'Пароль должен иметь не менее 8 символов и не более 32.',
	}),
})

export const RestoreAccountPassword: FC = () => {
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const loginButtonRef = useRef<HTMLButtonElement | null>(null)
	const changePassword = useRestoreAccount(store => store.changePassword)
	const setLoading = useStore(store => store.setLoading)
	const navigation = useNavigate()

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: '',
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			setLoading(true)

			const isSuccess = await changePassword(data.password)

			if (!isSuccess) {
				toast({
					title: 'Не удалось изменить пароль',
					description:
						'Попробуйте перезапустить приложение и подвторить снова. Если проблема не исчезнет напишите нам на почту: taskflowteam@gmail.com.',
				})
				return
			}

			navigation(ERoutes.login)
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	function sendHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}

	useEffect(() => {
		if (!passwordInputRef.current) return

		passwordInputRef.current.focus()
	}, [passwordInputRef.current])
	return (
		<div className="overflow-hidden">
			<NavBarBack />

			<SlideLeft>
				<div className="container">
					<div className="flex flex-col gap-6 justify-center items-center h-[calc(100vh-56px)]">
						<TypographyH3>Изменение пароля</TypographyH3>
						<Form {...form}>
							<form
								onSubmit={e => e.preventDefault()}
								className="w-full space-y-6 max-w-96"
							>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Новый пароль</FormLabel>
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

								<Button
									ref={loginButtonRef}
									onClick={sendHandler}
									type="button"
									disabled={!form.formState.isDirty || !form.formState.isValid}
									className="w-full"
								>
									Изменить
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</SlideLeft>
		</div>
	)
}
