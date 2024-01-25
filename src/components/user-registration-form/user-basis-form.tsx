import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { useAuthStore } from '@/storage'
import { FC, FormEvent, useEffect, useRef } from 'react'

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

export interface IUserBasisForm {
	onNext: () => void
}

export const UserBasisForm: FC<IUserBasisForm> = ({ onNext }) => {
	const emailInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const nextButtonRef = useRef<HTMLButtonElement | null>(null)

	const setRegInfo = useAuthStore(store => store.setRegInfo)

	const form = useForm<z.infer<typeof FormSchema>>({
		mode: 'onChange',
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setRegInfo(data)
	}

	function nextHandler(e: FormEvent) {
		e.preventDefault()

		form.handleSubmit(onSubmit)()

		onNext()
	}

	useEffect(() => {
		if (!emailInputRef.current) return

		emailInputRef.current.focus()
	}, [emailInputRef.current])
	return (
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
									placeholder="MyPassword123?"
									{...field}
									ref={e => {
										field.ref(e)
										passwordInputRef.current = e
									}}
									onKeyDown={e => {
										if (
											e.key === 'Enter' &&
											form.formState.isDirty &&
											form.formState.isValid
										) {
											nextButtonRef.current?.click()
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex justify-end">
					<Button
						onClick={nextHandler}
						disabled={!form.formState.isDirty || !form.formState.isValid}
						type="button"
						ref={nextButtonRef}
					>
						Далее
					</Button>
				</div>
			</form>
		</Form>
	)
}
