import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	TypographyH3,
	toast,
} from '@/components'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useRestoreAccount } from '@/storage'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { MouseEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'

const FormSchema = z.object({
	email: z
		.string()
		.regex(
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
			{
				message: 'Введите корректную почту',
			},
		),
})

export const RestoreAccountEmailForm: FC = () => {
	const emailInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const createOtp = useRestoreAccount(store => store.createOtp)

	const loader = useLoader()

	const navigation = useNavigate()

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const isSuccess = await loader(createOtp, data.email)

			if (!isSuccess) {
				toast({
					title: 'Не удалось найти пользователя',
				})
				return
			}

			navigation(ERoutes.restoreAccountOTP)
		} catch (e) {
			console.error(e)
		}
	}

	function sendHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		form.handleSubmit(onSubmit)()
	}
	return (
		<div className={'grid gap-6 max-w-96'}>
			<TypographyH3>Восстановление учетной записи</TypographyH3>
			<Form {...form}>
				<form onSubmit={e => e.preventDefault()} className="w-full space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
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
												nextButtonRef.current?.click()
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						ref={nextButtonRef}
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
